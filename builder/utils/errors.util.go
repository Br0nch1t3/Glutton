package utils

import (
	"strings"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func GetMessageFromFieldError(err error) string {
	_, ok := err.(validator.FieldError)
	if !ok {
		return "Bad format"
	}

	castErr := err.(validator.FieldError)

	switch castErr.Tag() {
	case "required":
		return ("Field '" + strings.ToLower(castErr.Field()) + "' is required")
	case "email":
		return ("Field '" + strings.ToLower(castErr.Field()) + "' should be an email")
	case "oneof", "datetime":
		return ("Field '" + strings.ToLower(castErr.Field()) + "' has invalid value")
	default:
		return "Bad format"
	}
}

func SendBadRequestError(c *fiber.Ctx, err error) error {
	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": err})
}
