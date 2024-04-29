package initializers

import (
	"go-starter-kit/models"

	"github.com/spf13/viper"
)

type Config struct {
	ServiceName string `mapstructure:"service_name"`

	DBHost     string `mapstructure:"db_host"`
	DBUser     string `mapstructure:"db_user"`
	DBPassword string `mapstructure:"db_password"`
	DBName     string `mapstructure:"db_name"`
	DBPort     string `mapstructure:"db_port"`
	DBBucket   string `mapstructure:"db_bucket"`

	ServerUrl  string `mapstructure:"server_url"`
	ServerHost string `mapstructure:"server_host"`
	ServerPort string `mapstructure:"server_port"`

	Cryptos []models.Crypto `mapstructure:"cryptos"`
}

var AppConfig Config

func LoadConfig(path string) (Config, error) {
	viper.AddConfigPath(path)
	viper.SetConfigType("json")
	viper.SetConfigName("app.env")

	viper.AutomaticEnv()

	err := viper.ReadInConfig()
	if err != nil {
		return AppConfig, err
	}

	err = viper.Unmarshal(&AppConfig)
	return AppConfig, err
}
