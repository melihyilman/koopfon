package handlers

import (
	"crypto/rand"
	"crypto/tls"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"time"
)

// EmailRequest defines the structure for the email sending request
type EmailRequest struct {
	To      []string `json:"to"`
	Subject string   `json:"subject"`
	Body    string   `json:"body"`
}

// ContactHandler godoc
// @Summary Send an email
// @Description Send an email using the contact service
// @Tags contact
// @Accept  json
// @Produce  json
// @Param email body EmailRequest true "Email Request"
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

	// Construct the email headers
	headers := make(map[string]string)
	headers["From"] = from
	headers["To"] = req.To[0]
	headers["Subject"] = req.Subject
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
	msg += "<html><body>" + req.Body + "</body></html>\r\n"

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

	for _, to := range req.To {
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