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
	app.Get("/seed",handlers.SeedHandler)

    app.Get("/packs", handlers.AllPacksHandler)
    app.Get("/tests", handlers.AllTestsHandler)
    app.Get("/sections", handlers.AllSectionsHandler)
    app.Get("/questions", handlers.AllQuestionsHandler)
    
    app.Get("/pack/:id", handlers.PackByIdHandler)
    app.Get("/test/:id", handlers.TestByIdHandler)
    app.Get("/section/:id", handlers.SectionByIdHandler)
    app.Get("/question/:id", handlers.QuestionByIdHandler)

    // app.Get("/test/:packId", handlers.TestByPackHandler)
    app.Get("/pack/tests/:packId", handlers.TestByPackHandler)
    app.Get("/test/sections/:testId", handlers.SectionByTestHandler)
    app.Get("/section/questions/:sectionId ", handlers.QuestionBySectionHandler)
    app.Listen(":8080")
}
