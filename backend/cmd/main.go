package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/palvevaishnav/newQuizrr/backend/internal/handlers"
    "github.com/palvevaishnav/newQuizrr/backend/prisma"
)

func main() {	
    app := fiber.New()
	defer prisma.CloseClient()

    app.Get("/", handlers.Start)
    app.Get("/tests", handlers.AllTestsHandler)
	app.Post("/question",handlers.AddQuestionHandler)

    app.Listen(":8080")
}
