package handlers

import (
	// "fmt"
    "github.com/gofiber/fiber/v2"
    "github.com/palvevaishnav/newQuizrr/backend/prisma"
    "github.com/palvevaishnav/newQuizrr/backend/prisma/db"
)

func AllQuestionsHandler(c *fiber.Ctx) error {
    client := prisma.GetClient()
    questions, err := client.Question.FindMany().Exec(c.Context())
    if err != nil {
        return c.Status(500).SendString("Error while fetching data.")
    }
    return c.JSON(questions)
}

// Test Overview,
func QuestionByIdHandler(c *fiber.Ctx) error {
    client := prisma.GetClient()
    id := c.Params("id")
	question, err := client.Question.FindUnique(
		db.Question.ID.Equals(id),
	).Exec(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get test"})
	}
	return c.JSON(question)
}

func QuestionBySectionHandler(c *fiber.Ctx) error {
    client := prisma.GetClient()
    
    sectionId := c.Params("sectionId")
	
    // fmt.Println("Context : ", c)
    // fmt.Println("All Params: ", c.AllParams())
    // fmt.Println("Section ID: ", sectionId)

    // Fetch questions by sectionId
    question, err := client.Question.FindMany(
        db.Question.SectionID.Equals(sectionId),
    ).Exec(c.Context())

    // Handle errors and return the response
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get section questions"})
    }
    return c.JSON(question)
}


