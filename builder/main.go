package main

import (
	"fmt"
	"go-starter-kit/controllers"
	"go-starter-kit/initializers"
	"go-starter-kit/services/influx"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	app := fiber.New()

	app.Use(logger.New())

	config, err := initializers.LoadConfig(".")

	if err != nil {
		log.Fatalln("Failed to load environment variables!", err.Error())
	}

	influxService := influx.New(&config)
	defer influxService.Close()

	controllers.HTMLController(app, influxService, &initializers.AppConfig)
	controllers.RSSController(app, influxService, &initializers.AppConfig)

	app.Get("/health", func(c *fiber.Ctx) error {
		return c.SendStatus(fiber.StatusOK)
	})

	app.Listen(fmt.Sprint(config.ServerHost, ":", config.ServerPort))
}
