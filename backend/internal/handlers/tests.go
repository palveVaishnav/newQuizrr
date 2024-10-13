package handlers

import (
    "github.com/gofiber/fiber/v2"
    "github.com/palvevaishnav/newQuizrr/backend/prisma"
    "github.com/palvevaishnav/newQuizrr/backend/prisma/db"
)

func AllTestsHandler(c *fiber.Ctx) error {
    client := prisma.GetClient()
    tests, err := client.Test.FindMany().Exec(c.Context())
    if err != nil {
        return c.Status(500).SendString("Error while fetching data.")
    }
    return c.JSON(tests)
}

// Test Overview,
func TestByIdHandler(c *fiber.Ctx) error {
    client := prisma.GetClient()
    id := c.Params("id")
	test, err := client.Test.FindUnique(
		db.Test.ID.Equals(id),
	).Exec(c.Context())

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get test"})
	}
	return c.JSON(test)
}

func TestByPackHandler(c *fiber.Ctx) error{
    client := prisma.GetClient()
    packId := c.Params("packId")
    test, err := client.Test.FindMany(
        db.Test.PacksID.Equals(packId),
    ).Exec(c.Context())
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get pack related test"})
    }
    return c.JSON(test)
}

func CompleteTest(c *fiber.Ctx) error{
    client := prisma.GetClient()
    testId := c.Params("id")
    completeTest, err := client.Test.FindUnique(
        db.Test.ID.Equals(testId),
    ).With(
        db.Test.Sections.Fetch().With(
            db.Section.Questions.Fetch(), // Fetch questions for each section
        ),
    ).Exec(c.Context())
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get complete test"})
    }

    // Return the complete test data (with sections and questions)
    return c.JSON(completeTest)
}

