package handlers

import (
    "fmt"
    "github.com/gofiber/fiber/v2"
    "github.com/palvevaishnav/newQuizrr/backend/prisma"
    "github.com/palvevaishnav/newQuizrr/backend/prisma/db"
    "github.com/steebchen/prisma-client-go/runtime/types"
)

type AddQuestion struct {
    Question  string `json:"question" validate:"required"`
    Answer    int    `json:"answer" validate:"required"`
    Marks     int    `json:"marks" validate:"required"`
}

func AllTestsHandler(c *fiber.Ctx) error {
    client := prisma.GetClient()
    attempts, err := client.Attempt.FindMany().Exec(c.Context())
    if err != nil {
        return c.Status(500).SendString("Error while fetching data.")
    }
    return c.JSON(attempts)
}

func AddQuestionHandler(c *fiber.Ctx) error {
    client := prisma.GetClient()
    var reqQuestion AddQuestion

    // Parse the request body
    if err := c.BodyParser(&reqQuestion); err != nil {
        return c.Status(400).SendString("Invalid Question Format!")
    }

    // Hardcoded options
    options := []string{"Option 1", "Option 2", "Option 3", "Option 4"}

    // Convert options to JSON
    optionsType := types.JSON([]byte(fmt.Sprintf("%q", options))) // Convert to JSON format

    // Creating the question in the database
    question, err := client.Question.CreateOne(
        db.Question.Question.Set(reqQuestion.Question),
        db.Question.Options.Set(optionsType),  // Setting options as JSON
        db.Question.Answer.Set(reqQuestion.Answer),
        db.Question.Marks.Set(reqQuestion.Marks),
    ).Exec(c.Context())

    if err != nil {
        return c.Status(500).SendString(fmt.Sprintf("Failed to create question: %v", err))
    }

    return c.Status(201).JSON(question)
}
