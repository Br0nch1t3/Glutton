package controllers

import (
	"go-starter-kit/initializers"
	"go-starter-kit/services/influx"
	services_occurence "go-starter-kit/services/occurence"

	"github.com/gofiber/fiber/v2"
)

func RSSController(app *fiber.App, influxService *influx.InfluxService, config *initializers.Config) {
	// Receive RSS updates
	app.Post("/rss", func(c *fiber.Ctx) error {
		return services_occurence.CreateOccurenceChunk(c, influxService, config)
	})
}
