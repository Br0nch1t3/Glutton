package influx

import (
	"go-starter-kit/initializers"
	"log"

	influxdb2 "github.com/influxdata/influxdb-client-go/v2"
	"github.com/influxdata/influxdb-client-go/v2/api"
)

type InfluxService struct {
	Client   influxdb2.Client
	WriteApi api.WriteAPIBlocking
}

func New(config *initializers.Config) *InfluxService {
	influxService := new(InfluxService)

	log.Println([]string{config.DBPassword})

	influxService.Client = influxdb2.NewClient("http://"+config.DBHost+":"+config.DBPort, config.DBPassword)
	influxService.WriteApi = influxService.Client.WriteAPIBlocking(config.DBName, config.DBBucket)

	return influxService
}

func (influxService *InfluxService) Close() {
	influxService.Client.Close()
}
