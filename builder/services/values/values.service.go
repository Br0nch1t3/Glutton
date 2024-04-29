package services_values

import (
	"context"
	dto_request "go-starter-kit/dto/request"
	"go-starter-kit/initializers"
	"go-starter-kit/services/influx"
	"go-starter-kit/utils"
	"time"

	"github.com/gofiber/fiber/v2"
	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
)

func CreateValuesChunk(c *fiber.Ctx, influxService *influx.InfluxService, config *initializers.Config) error {
	body := new(dto_request.HTMLChunkRequestBody)
	params := new(dto_request.HTMLChunkRequestParams)

	if err := utils.ValidateChunkRequest(c, body, params); err != nil {
		return utils.SendBadRequestError(c, err)
	}

	timestamp, err := time.Parse(time.RFC3339, *params.Timestamp)

	if err != nil {
		return utils.SendBadRequestError(c, err)
	}

	for _, data := range body.Data {
		for measurement, metric := range data.Metrics {
			point := influxdb2.NewPoint(measurement, map[string]string{"source": body.Source, "crypto": data.Name}, fiber.Map{"value": metric.Value}, timestamp)

			if err := influxService.WriteApi.WritePoint(context.Background(), point); err != nil {
				return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": err.Error()})
			}
		}
	}

	return c.SendStatus(fiber.StatusCreated)
}
