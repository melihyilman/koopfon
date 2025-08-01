package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"net/smtp"

	"github.com/koopfon/contact-service/internal/models"
)

func ContactHandler(w http.ResponseWriter, r *http.Request) {
	var contact models.Contact
	err := json.NewDecoder(r.Body).Decode(&contact)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Replace with your email configuration
	from := "your-email@example.com"
	password := "your-email-password"
	to := []string{"recipient-email@example.com"}
	smtpHost := "smtp.example.com"
	smtpPort := "587"

	msg := []byte("To: " + to[0] + "\r\n" +
		"Subject: New Contact Form Submission\r\n" +
		"\r\n" +
		"Name: " + contact.Name + "\r\n" +
		"Email: " + contact.Email + "\r\n" +
		"Phone: " + contact.Phone + "\r\n" +
		"Message: " + contact.Message + "\r\n")

	auth := smtp.PlainAuth("", from, password, smtpHost)
	err = smtp.SendMail(smtpHost+":"+smtpPort, auth, from, to, msg)
	if err != nil {
		log.Println(err)
		http.Error(w, "Error sending email", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
