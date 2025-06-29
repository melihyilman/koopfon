package main

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Cooperative Service API
// @version 1.0
// @description This is the Cooperative Service API for the Koopfon application.
// @host localhost:8082
// @BasePath /
func main() {
	r := gin.Default()
	r.GET("/cooperatives/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "cooperative-service running"})
	})

	// Swagger endpoint
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":8082")
}
