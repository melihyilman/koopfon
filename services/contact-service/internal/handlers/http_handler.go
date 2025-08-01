package handlers

import (
	"crypto/tls"
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
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Printf("Error decoding request body: %v", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// --- Get credentials and configuration from environment variables ---
	from := os.Getenv("SMTP_FROM")
	password := os.Getenv("SMTP_PASSWORD")
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")

	if from == "" || password == "" || smtpHost == "" || smtpPort == "" {
		log.Println("Error: SMTP configuration is incomplete. All SMTP environment variables (HOST, PORT, FROM, PASSWORD) must be set.")
		http.Error(w, "Server email configuration is incomplete", http.StatusInternalServerError)
		return
	}

	// Static recipient list
	recipients := []string{"melihyilman@gmail.com", "1koopfon@gmail.com"}

	// --- Create HTML Email Body ---

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
	messageParts := strings.Split(req.Body, "Mesaj:")
	message := ""
	if len(messageParts) > 1 {
		message = strings.TrimSpace(messageParts[1])
	}
	bodyData["Mesaj"] = message

	htmlBody := fmt.Sprintf(`
<!DOCTYPE html><html><head><style>body{font-family:Arial,sans-serif;margin:0;padding:20px;background-color:#f4f4f4;}.container{background-color:#ffffff;border-radius:8px;padding:20px;max-width:600px;margin:auto;border:1px solid #ddd;}.header{font-size:24px;color:#175844;margin-bottom:20px;text-align:center;}.content-table{width:100%%;border-collapse:collapse;}.content-table th,.content-table td{padding:12px 15px;border:1px solid #ddd;text-align:left;}.content-table th{background-color:#f8f8f8;color:#333;width:150px;}.message-block{background-color:#fdfdfd;border-left:4px solid #175844;padding:15px;margin-top:15px;white-space:pre-wrap;word-wrap:break-word;}.footer{text-align:center;margin-top:20px;font-size:12px;color:#888;}</style></head><body><div class="container"><div class="header">Koopfon İletişim Formu</div><table class="content-table"><tr><th>Ad Soyad</th><td>%s</td></tr><tr><th>E-posta</th><td><a href="mailto:%s">%s</a></td></tr><tr><th>Telefon</th><td>%s</td></tr><tr><th>Talep Tarihi</th><td>%s</td></tr></table><div class="message-block"><strong>Mesaj:</strong><br>%s</div><div class="footer">Bu e-posta, Koopfon web sitesi üzerinden gönderilmiştir.</div></div></body></html>`,
		html.EscapeString(bodyData["Ad Soyad"]),
		html.EscapeString(bodyData["E-posta"]),
		html.EscapeString(bodyData["E-posta"]),
		html.EscapeString(bodyData["Telefon"]),
		html.EscapeString(bodyData["Mesaj"]),
	)

	// --- Construct the email message with headers ---
	headers := make(map[string]string)
	headers["From"] = from
	headers["To"] = strings.Join(recipients, ", ")
	headers["Subject"] = req.Subject
	headers["Reply-To"] = req.ReplyTo
	headers["MIME-Version"] = "1.0"
	headers["Content-Type"] = "text/html; charset=utf-8"

	var msg strings.Builder
	for k, v := range headers {
		msg.WriteString(fmt.Sprintf("%s: %s\r\n", k, v))
	}
	msg.WriteString("\r\n")
	msg.WriteString(htmlBody)

	// --- Send the email (manual SMTP connection with InsecureSkipVerify) ---
	auth := smtp.PlainAuth("", from, password, smtpHost)
	addr := smtpHost + ":" + smtpPort

	// TLS configuration with insecure skip verify
	tlsconfig := &tls.Config{
		InsecureSkipVerify: true,
		ServerName:         smtpHost,
	}

	log.Println("Connecting to SMTP server...")
	c, err := smtp.Dial(addr)
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

	_, err = wc.Write([]byte(msg.String()))
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