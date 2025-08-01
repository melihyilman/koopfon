package handlers

import (
	"crypto/rand"
	"crypto/tls"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"html"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"strings"
	"time"
)

// EmailRequest defines the structure for the incoming request
type EmailRequest struct {
	Subject        string `json:"subject"`
	Body           string `json:"body"`
	ReplyTo        string `json:"reply_to"`
	SubmissionDate string `json:"submission_date"`
}

// ContactHandler godoc
// @Summary Send a contact form email
// @Description Send an email from the contact form to a predefined list of recipients.
// @Tags contact
// @Accept  json
// @Produce  json
// @Param email body EmailRequest true "Contact Form Request"
// @Success 200 {object} map[string]string
// @Failure 400 {string} string "Bad Request"
// @Failure 500 {string} string "Internal Server Error"
// @Router /contact [post]
func ContactHandler(w http.ResponseWriter, r *http.Request) {
	var req EmailRequest
	log.Println("Received request to send email")
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		log.Printf("Error decoding request body: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Get credentials from environment variables
	from := os.Getenv("SMTP_FROM")
	password := os.Getenv("SMTP_PASSWORD")
	if from == "" || password == "" {
		log.Println("Error: SMTP_FROM and SMTP_PASSWORD environment variables must be set")
		http.Error(w, "Email server not configured", http.StatusInternalServerError)
		return
	}

	// Static recipient list
	recipients := []string{"melihyilman@gmail.com", "1koopfon@gmail.com"}

	smtpHost := "mail.koopfon.com"
	smtpPort := "587"

	// Create a unique boundary for the multipart message
	b := make([]byte, 16)
	_, err = rand.Read(b)
	if err != nil {
		log.Printf("Error creating boundary: %v", err)
		http.Error(w, "Error creating boundary", http.StatusInternalServerError)
		return
	}
	boundary := base64.URLEncoding.EncodeToString(b)

	// --- Create HTML Email Body ---
	// Parse submission date
	submissionTime, err := time.Parse(time.RFC3339, req.SubmissionDate)
	formattedDate := "Bilinmiyor"
	if err == nil {
		loc, _ := time.LoadLocation("Europe/Istanbul")
		formattedDate = submissionTime.In(loc).Format("02 Ocak 2006, 15:04:05 (MST)")
	}

	// Safely extract details from the plain text body
	bodyData := make(map[string]string)
	lines := strings.Split(req.Body, "\n")
	for _, line := range lines {
		if strings.Contains(line, ":") {
			parts := strings.SplitN(line, ":", 2)
			if len(parts) == 2 {
				bodyData[strings.TrimSpace(parts[0])] = strings.TrimSpace(parts[1])
			}
		}
	}

	// Safely get the message part
	messageParts := strings.Split(req.Body, "Mesaj:")
	message := ""
	if len(messageParts) > 1 {
		message = strings.TrimSpace(messageParts[1])
	}
	bodyData["Mesaj"] = message

	log.Printf("Parsed body data for HTML email: %+v", bodyData)

	htmlBody := fmt.Sprintf(`
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
  .container { background-color: #ffffff; border-radius: 8px; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; }
  .header { font-size: 24px; color: #175844; margin-bottom: 20px; text-align: center; }
  .content-table { width: 100%%; border-collapse: collapse; }
  .content-table th, .content-table td { padding: 12px 15px; border: 1px solid #ddd; text-align: left; }
  .content-table th { background-color: #f8f8f8; color: #333; width: 150px; }
  .message-block { background-color: #fdfdfd; border-left: 4px solid #175844; padding: 15px; margin-top: 15px; white-space: pre-wrap; word-wrap: break-word; }
  .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #888; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">Koopfon İletişim Formu</div>
    <table class="content-table">
      <tr><th>Ad Soyad</th><td>%s</td></tr>
      <tr><th>E-posta</th><td><a href="mailto:%s">%s</a></td></tr>
      <tr><th>Telefon</th><td>%s</td></tr>
      <tr><th>Talep Tarihi</th><td>%s</td></tr>
    </table>
    <div class="message-block"><strong>Mesaj:</strong><br>%s</div>
    <div class="footer">Bu e-posta, Koopfon web sitesi üzerinden gönderilmiştir.</div>
  </div>
</body>
</html>
`,
		html.EscapeString(bodyData["Ad Soyad"]),
		html.EscapeString(bodyData["E-posta"]),
		html.EscapeString(bodyData["E-posta"]),
		html.EscapeString(bodyData["Telefon"]),
		formattedDate,
		html.EscapeString(bodyData["Mesaj"]),
	)

	// --- Construct the email headers ---
	headers := make(map[string]string)
	headers["From"] = from
	headers["To"] = strings.Join(recipients, ", ")
	headers["Subject"] = req.Subject
	headers["Reply-To"] = req.ReplyTo
	headers["MIME-Version"] = "1.0"
	headers["Content-Type"] = "multipart/alternative; boundary=" + boundary
	headers["Date"] = time.Now().Format(time.RFC1123Z)
	messageID := fmt.Sprintf("<%d.%s@%s>", time.Now().UnixNano(), boundary, "koopfon.com")
	headers["Message-ID"] = messageID

	// Construct the email body
	var msg string
	for k, v := range headers {
		msg += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	msg += "\r\n"

	// Plain text part
	msg += "--" + boundary + "\r\n"
	msg += "Content-Type: text/plain; charset=utf-8\r\n"
	msg += "\r\n"
	msg += req.Body + "\r\n"

	// HTML part
	msg += "--" + boundary + "\r\n"
	msg += "Content-Type: text/html; charset=utf-8\r\n"
	msg += "\r\n"
	msg += htmlBody + "\r\n"

	// End boundary
	msg += "--" + boundary + "--\r\n"

	log.Println("Authenticating with SMTP server...")
	auth := smtp.PlainAuth("", from, password, smtpHost)

	// TLS configuration
	tlsconfig := &tls.Config{
		InsecureSkipVerify: true,
		ServerName:         smtpHost,
	}

	log.Println("Connecting to SMTP server...")
	c, err := smtp.Dial(smtpHost + ":" + smtpPort)
	if err != nil {
		log.Printf("Error connecting to SMTP server: %v", err)
		http.Error(w, "Error connecting to SMTP server", http.StatusInternalServerError)
		return
	}

	log.Println("Starting TLS...")
	if err = c.StartTLS(tlsconfig); err != nil {
		log.Printf("Error starting TLS: %v", err)
		http.Error(w, "Error starting TLS", http.StatusInternalServerError)
		return
	}

	log.Println("Authenticating...")
	if err = c.Auth(auth); err != nil {
		log.Printf("Error authenticating: %v", err)
		http.Error(w, "Error authenticating", http.StatusInternalServerError)
		return
	}

	log.Println("Sending email...")
	if err = c.Mail(from); err != nil {
		log.Printf("Error setting from address: %v", err)
		http.Error(w, "Error setting from address", http.StatusInternalServerError)
		return
	}

	for _, to := range recipients {
		if err = c.Rcpt(to); err != nil {
			log.Printf("Error setting to address: %v", err)
			http.Error(w, "Error setting to address", http.StatusInternalServerError)
			return
		}
	}

	wc, err := c.Data()
	if err != nil {
		log.Printf("Error getting data writer: %v", err)
		http.Error(w, "Error getting data writer", http.StatusInternalServerError)
		return
	}

	_, err = wc.Write([]byte(msg))
	if err != nil {
		log.Printf("Error writing message: %v", err)
		http.Error(w, "Error writing message", http.StatusInternalServerError)
		return
	}

	err = wc.Close()
	if err != nil {
		log.Printf("Error closing data writer: %v", err)
		http.Error(w, "Error closing data writer", http.StatusInternalServerError)
		return
	}

	c.Quit()

	log.Println("Email sent successfully!")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Email sent successfully!"})
}