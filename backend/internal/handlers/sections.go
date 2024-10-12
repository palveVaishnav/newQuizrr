package handlers

import (
    "github.com/gofiber/fiber/v2"
    "github.com/palvevaishnav/newQuizrr/backend/prisma"
    "github.com/palvevaishnav/newQuizrr/backend/prisma/db"
)

func AllSectionsHandler(c *fiber.Ctx) error {
    client := prisma.GetClient()
    sections, err := client.Section.FindMany().Exec(c.Context())
    if err != nil {
        return c.Status(500).SendString("Error while fetching data.")
    }
    return c.JSON(sections)
}

// Test Overview,
func SectionByIdHandler(c *fiber.Ctx) error {
    client := prisma.GetClient()
    id := c.Params("id")
	section, err := client.Section.FindUnique(
		db.Section.ID.Equals(id),
	).Exec(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get test"})
	}
	return c.JSON(section)
}

func SectionByTestHandler(c *fiber.Ctx) error{
	client := prisma.GetClient()
	id := c.Params("testId")
	section, err := client.Section.FindMany(
		db.Section.TestID.Equals(id),
	).Exec(c.Context())
	if err != nil {
		return c.Status(500).SendString("Error while fetching test Sections")
	}
	return c.JSON(section)
}

