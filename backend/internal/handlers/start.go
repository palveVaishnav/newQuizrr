package handlers

import (
    "github.com/gofiber/fiber/v2"
)

func Start(c *fiber.Ctx) error {
    return c.SendString("From Kam kr raha hai")
}


