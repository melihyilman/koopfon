package main

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	"net/url"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Koopfon API Gateway
// @version 1.0
// @description This is the API Gateway for the Koopfon application.
// @host localhost:8080
// @BasePath /
func main() {
	r := gin.Default()

	// JWT Middleware placeholder
	// r.Use(JWTMiddleware())

	// The service names and ports match the docker-compose.yml file
	r.Any("/auth/*proxyPath", proxyHandler("auth-service", 8081))
	r.Any("/cooperatives/*proxyPath", proxyHandler("cooperative-service", 8082))
	r.Any("/partners/*proxyPath", proxyHandler("partner-service", 8083))
	r.Any("/contact/*proxyPath", proxyHandler("contact-service", 8084))

	// Swagger endpoint
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":8080")
}

// proxyHandler creates a reverse proxy to the target service.
func proxyHandler(service string, port int) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Create the target URL for the proxy
		targetURL := fmt.Sprintf("http://%s:%d", service, port)
		remote, err := url.Parse(targetURL)
		if err != nil {
			// In a real app, you'd use a structured logger
			fmt.Printf("Error parsing target URL: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Internal server error"})
			return
		}

		// Create a new reverse proxy
		proxy := httputil.NewSingleHostReverseProxy(remote)

		// Update the request host and path
		proxy.Director = func(req *http.Request) {
			req.Header = c.Request.Header
			req.Host = remote.Host
			req.URL.Scheme = remote.Scheme
			req.URL.Host = remote.Host
			req.URL.Path = c.Param("proxyPath")
		}

		// Serve the request to the target service
		proxy.ServeHTTP(c.Writer, c.Request)
	}
}

// JWTMiddleware is a placeholder for future JWT authentication
func JWTMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// TODO: Implement JWT authentication
		// 1. Get token from header
		// 2. Validate token
		// 3. If valid, c.Next()
		// 4. If not, c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		c.Next()
	}
}