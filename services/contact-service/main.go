package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/koopfon/contact-service/docs"
	contactHandlers "github.com/koopfon/contact-service/internal/handlers"
	httpSwagger "github.com/swaggo/http-swagger"
)

// @title Contact Service API
// @version 1.0
// @description This is a simple contact service.
// @termsOfService http://swagger.io/terms/
// @contact.name API Support
// @contact.email soberkoder@swagger.io
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @host koopfon-797637104173.europe-west1.run.app
// @BasePath /
// @schemes https
func main() {
	r := mux.NewRouter()
	
	// Contact endpoint - POST ve OPTIONS metodlarını ekle
	r.HandleFunc("/contact", contactHandlers.ContactHandler).Methods("POST", "OPTIONS")
	
	// Manual OPTIONS handler for preflight requests
	r.HandleFunc("/contact", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin")
		w.WriteHeader(http.StatusOK)
	}).Methods("OPTIONS")

	// Swagger handler
	r.PathPrefix("/swagger/").Handler(httpSwagger.Handler(
		httpSwagger.URL("https://koopfon-797637104173.europe-west1.run.app/swagger/doc.json"),
	))

	// Redirect root to swagger docs
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/swagger/index.html", http.StatusMovedPermanently)
	})

	// CORS configuration - AllowCredentials kaldırıldı
	crs := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}), // Allow all origins
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"}),
		handlers.AllowedHeaders([]string{
			"Content-Type", 
			"Authorization", 
			"X-Requested-With", 
			"Accept", 
			"Origin",
			"Access-Control-Request-Method",
			"Access-Control-Request-Headers",
		}),
		// AllowCredentials() kaldırıldı - * origin ile uyumlu değil
	)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Cloud Run default port
	}

	log.Printf("Contact service listening on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, crs(r)))
}