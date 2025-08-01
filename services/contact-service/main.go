package main

import (
	"log"
	"net/http"
	"os"
	"regexp"

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
// @host koopfon.onrender.com
// @BasePath /
// @schemes https
func main() {
	r := mux.NewRouter()
	r.HandleFunc("/contact", contactHandlers.ContactHandler).Methods("POST")

	// Swagger handler
	r.PathPrefix("/swagger/").Handler(httpSwagger.Handler(
		httpSwagger.URL("https://koopfon.onrender.com/swagger/doc.json"),
	))

	// Redirect root to swagger docs
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/swagger/index.html", http.StatusMovedPermanently)
	})

	// CORS configuration with a simpler, more secure regex validator.
	allowedOrigins := handlers.AllowedOriginValidator(func(origin string) bool {
		// Allow koopfon.com, test.koopfon.com, and localhost (with any port).
		matched, _ := regexp.MatchString(`^https?://(localhost|koopfon\.com|test\.koopfon\.com)(:\d+)?$`, origin)
		return matched
	})

	crs := handlers.CORS(
		allowedOrigins,
		handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081" // Default port if not specified
	}

	log.Printf("Contact service listening on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, crs(r)))
}
