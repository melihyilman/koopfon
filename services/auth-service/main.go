package main

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Auth Service API
// @version 1.0
// @description This is the Auth Service API for the Koopfon application.
// @host localhost:8081
// @BasePath /
func main() {
	r := gin.Default()
	// Auth endpoints
	r.GET("/auth/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "auth-service running"})
	})

	// Swagger endpoint
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":8081")
}
