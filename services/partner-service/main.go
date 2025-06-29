package main

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title Partner Service API
// @version 1.0
// @description This is the Partner Service API for the Koopfon application.
// @host localhost:8083
// @BasePath /
func main() {
	r := gin.Default()
	r.GET("/partners/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "partner-service running"})
	})

	// Swagger endpoint
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	r.Run(":8083")
}
