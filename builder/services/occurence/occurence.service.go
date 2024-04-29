package services_occurence

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	dto_request "go-starter-kit/dto/request"
	"go-starter-kit/initializers"
	"go-starter-kit/models"
	"go-starter-kit/services/influx"
	"go-starter-kit/utils"
	"regexp"
	"time"

	"github.com/gofiber/fiber/v2"
	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
)

func CreateOccurenceChunk(c *fiber.Ctx, influxService *influx.InfluxService, config *initializers.Config) error {
	body := new(dto_request.RSSChunkRequestBody)
	params := new(dto_request.RSSChunkRequestParams)

	if err := utils.ValidateChunkRequest(c, body, params); err != nil {
		return utils.SendBadRequestError(c, err)
	}

	timestamp, err := getTimestamp(params, body)

	if err != nil {
		return utils.SendBadRequestError(c, err)
	}

	cryptos := countWords(body, config.Cryptos)
	jsonCrypto, err := json.Marshal(cryptos)

	if err != nil {
		return utils.SendBadRequestError(c, err)
	}

	point := influxdb2.NewPoint("occurences", map[string]string{"source": params.Source}, fiber.Map{"value": string(jsonCrypto[:])}, timestamp)

	if err := influxService.WriteApi.WritePoint(context.Background(), point); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": err.Error()})
	}

	return c.SendStatus(fiber.StatusCreated)
}

func countWords(data *dto_request.RSSChunkRequestBody, cryptos []models.Crypto) map[string]int {
	result := map[string]int{}

	for _, crypto := range cryptos {
		key := fmt.Sprintf("%s(%s)", crypto.Short, crypto.Long)
		reStr := fmt.Sprintf("(?i)\\s(%s|%s)(\\s|$)", crypto.Short, crypto.Long)
		re := regexp.MustCompile(reStr)

		result[key] =
			len(re.FindAllString(data.Channel.Description, -1)) +
				len(re.FindAllString(data.Channel.Title, -1)) +
				utils.Reduce(data.Channel.Item, func(acc int, curr dto_request.RSSChannelItem) int {
					return acc + len(re.FindAllString(curr.Category, -1)) +
						len(re.FindAllString(curr.Comments, -1)) +
						len(re.FindAllString(curr.Description, -1)) +
						len(re.FindAllString(curr.Title, -1))
				}, 0)
	}

	return result
}

func getTimestamp(params *dto_request.RSSChunkRequestParams, body *dto_request.RSSChunkRequestBody) (time.Time, error) {
	date := utils.GetFallbackValue(body.Channel.LastBuildDate, body.Channel.PubDate, params.Timestamp)

	if date == nil {
		return time.Time{}, errors.New("no suitable timestamp could be parsed")
	}

	timestamp, err := utils.TimeParse([]string{time.RFC822Z, time.RFC822, time.RFC1123Z, time.RFC1123Z, time.RFC3339}, *date)

	return timestamp, err
}
