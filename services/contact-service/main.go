package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/koopfon/contact-service/docs"
	"github.com/koopfon/contact-service/internal/handlers"
	swagger "github.com/swaggo/http-swagger"
)

// @title Contact Service API
// @version 1.0
// @description This is a simple contact service.
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email soberkoder@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host koopfon.onrender.com
// @BasePath /
func main() {
	r := mux.NewRouter()
	r.HandleFunc("/contact", handlers.ContactHandler).Methods("POST")
	r.PathPrefix("/swagger/").Handler(swagger.WrapHandler)

	// Redirect root to swagger docs
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/swagger/index.html", http.StatusMovedPermanently)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081" // Default port if not specified
	}

	log.Printf("Contact service listening on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}