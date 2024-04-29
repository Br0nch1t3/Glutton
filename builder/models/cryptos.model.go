package models

type Crypto struct {
	Short string `mapstructure:"short"`
	Long  string `mapstructure:"long"`
}
