package utils

import (
	"errors"
	"go-starter-kit/utils/validators"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func ValidateStruct[T interface{}](c *fiber.Ctx, body T, customValidators ...func(*fiber.Ctx, T) error) error {
	var validate *validator.Validate = validator.New()

	if err := validate.RegisterValidation("date", validators.IsDate); err != nil {
		return err
	}

	if err := validate.Struct(body); err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			return err
		}
	}

	for _, customValidator := range customValidators {
		if err := customValidator(c, body); err != nil {
			return err
		}
	}

	return nil
}

func ParseData[T interface{}](c *fiber.Ctx, body *T) error {
	if err := c.BodyParser(body); err != nil {
		return err
	}

	return nil
}

func ParseQueryParams[T interface{}](c *fiber.Ctx, qp T) error {

	if err := c.QueryParser(qp); err != nil {
		return err
	}

	if err := ValidateStruct[T](c, qp); err != nil {
		return errors.New(GetMessageFromFieldError(err))
	}

	return nil
}

func ValidateChunkRequest[B interface{}, P interface{}](c *fiber.Ctx, body *B, params *P) error {
	if err := c.BodyParser(body); err != nil {
		return err
	}

	if err := c.QueryParser(params); err != nil {
		return err
	}

	if err := ValidateStruct(c, body); err != nil {
		return err
	}

	if err := ValidateStruct(c, params); err != nil {
		return err
	}

	return nil
}

// Get the first non nil value
func GetFallbackValue[T interface{}](values ...*T) *T {
	for i := 0; i < len(values); i++ {
		if values[i] != nil {
			return values[i]
		}
	}

	return nil
}
