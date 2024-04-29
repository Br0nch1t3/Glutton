package controllers

import (
	"go-starter-kit/initializers"
	"go-starter-kit/services/influx"
	services_values "go-starter-kit/services/values"

	"github.com/gofiber/fiber/v2"
)

func HTMLController(app *fiber.App, influxService *influx.InfluxService, config *initializers.Config) {
	// Receive HTML updates
	app.Post("/html", func(c *fiber.Ctx) error {
		return services_values.CreateValuesChunk(c, influxService, config)
	})
}
