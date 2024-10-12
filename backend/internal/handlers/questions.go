package handlers

import (
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
    id := c.Params("sectionId")
	questions, err := client.Question.FindMany(
		db.Question.SectionID.Equals(id),
	).Exec(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get test"})
	}
	return c.JSON(questions)
}


