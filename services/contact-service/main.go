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
	r.HandleFunc("/contact", contactHandlers.ContactHandler).Methods("POST")

	// Swagger handler
	r.PathPrefix("/swagger/").Handler(httpSwagger.Handler(
		httpSwagger.URL("https://koopfon-797637104173.europe-west1.run.app/swagger/doc.json"),
	))

	// Redirect root to swagger docs
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/swagger/index.html", http.StatusMovedPermanently)
	})

	// Permissive CORS configuration
	crs := handlers.CORS(
		handlers.AllowedOriginValidator(func(origin string) bool {
			// Allow all origins
			return true
		}),
		handlers.AllowedMethods([]string{"*"}),
		// The gorilla/handlers package does not support `*` for headers. We list common ones instead.
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization", "Accept", "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"}),
		handlers.AllowCredentials(),
	)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8081" // Default port if not specified
	}

	log.Printf("Contact service listening on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, crs(r)))
}
