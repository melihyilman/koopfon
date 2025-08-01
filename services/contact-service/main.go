package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/koopfon/contact-service/internal/handlers"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/contact", handlers.ContactHandler).Methods("POST")

	log.Println("Contact service listening on port 8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
