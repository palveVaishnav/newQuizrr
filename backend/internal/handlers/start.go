package handlers

import (
    "github.com/gofiber/fiber/v2"
)

func Start(c *fiber.Ctx) error {
    return c.Status(200).SendString("Backend Kam kr raha hai")
}
