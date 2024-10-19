package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/palvevaishnav/newQuizrr/backend/internal/handlers"
    "github.com/palvevaishnav/newQuizrr/backend/prisma"
    "github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {	
    app := fiber.New()
	defer prisma.CloseClient()

    app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

    app.Get("/", handlers.Start)
	app.Get("/seed",handlers.SeedHandler)
    app.Post("/user", handlers.UserLoginHandler)

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
    // app.Get("/section/questions/:sectionId ", handlers.QuestionBySectionHandler)  this isn't working, don't know why !!
    app.Get("/section/:sectionId/questions", handlers.QuestionBySectionHandler)   // this works

    app.Get("/exam/:id", handlers.CompleteTest)   // this works


    app.Get("/attempts",handlers.AllAttempts)
    // post requests 
    app.Post("/attempt",handlers.AttemptHandler)

    app.Listen(":8080")
}
