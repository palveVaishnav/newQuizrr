package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/palvevaishnav/newQuizrr/backend/internal/handlers"
)

func main() {
    app := fiber.New()

    app.Get("/", handlers.Start)

    app.Listen(":8080")
}
