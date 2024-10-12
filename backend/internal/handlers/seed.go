package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"math/rand"

	"github.com/gofiber/fiber/v2"
	"github.com/palvevaishnav/newQuizrr/backend/prisma"
	"github.com/palvevaishnav/newQuizrr/backend/prisma/db"
	"github.com/steebchen/prisma-client-go/runtime/types"
)

// CreatePacksHandler dynamically creates packs with tests, sections, and questions
func SeedHandler(c *fiber.Ctx) error {
	client := prisma.GetClient()
	if err := client.Prisma.Connect(); err != nil {
		return err
	}
	defer client.Prisma.Disconnect()

	ctx := context.Background()

	// Utility function to create random questions
	createRandomQuestions := func(sectionID string, numQuestions int) error {
		options := []string{"Option 1", "Option 2", "Option 3", "Option 4"}
		optionsJSON, err := json.Marshal(options)
		if err != nil {
			return fmt.Errorf("could not marshal options: %w", err)
		}
		optionsType := types.JSON(optionsJSON)

		for i := 0; i < numQuestions; i++ {
			_, err := client.Question.CreateOne(
				db.Question.Question.Set(fmt.Sprintf("Question %d for Section %s", i+1, sectionID)),
				db.Question.Options.Set(optionsType),
				db.Question.Answer.Set(rand.Intn(4)), // Randomly choose the correct answer index
				db.Question.Marks.Set(4),
				db.Question.Section.Link(db.Section.ID.Equals(sectionID)),
			).Exec(ctx)
			if err != nil {
				return fmt.Errorf("failed to create question: %w", err)
			}
		}
		return nil
	}

	// Function to create sections for each test
	createSections := func(testID string) error {
		for s := 1; s <= 3; s++ {
			section, err := client.Section.CreateOne(
				db.Section.Title.Set(fmt.Sprintf("Section-%d", s)),
				db.Section.MaxMarks.Set(40),
				db.Section.Test.Link(db.Test.ID.Equals(testID)),
			).Exec(ctx)
			if err != nil {
				return fmt.Errorf("failed to create section: %w", err)
			}

			// Create 4-6 random questions per section
			numQuestions := 4 + rand.Intn(3) // Generates 4 to 6 questions
			err = createRandomQuestions(section.ID, numQuestions)
			if err != nil {
				return err
			}
		}
		return nil
	}

	// Function to create tests for each pack
	createTests := func(packID string, numTests int) error {
		for t := 1; t <= numTests; t++ {
			test, err := client.Test.CreateOne(
				db.Test.Title.Set(fmt.Sprintf("Test-%d", t)),
				db.Test.NumberOfQuestions.Set(30),
				db.Test.MaxMarks.Set(100),
				db.Test.TestTime.Set(120),
				db.Test.IsLocked.Set(false),
				db.Test.Packs.Link(db.Pack.ID.Equals(packID)),
			).Exec(ctx)
			if err != nil {
				return fmt.Errorf("failed to create test: %w", err)
			}

			// Create sections and questions for this test
			err = createSections(test.ID)
			if err != nil {
				return err
			}
		}
		return nil
	}

	// Create Pack 1
	packOne, err := client.Pack.CreateOne(
		db.Pack.Prize.Set(4000),
		db.Pack.Title.Set("Pack - 01"),
		db.Pack.Subtitle.Set("Subtitle of the pack"),
		db.Pack.Description.Set("Descriptions of the pack"),
		db.Pack.Batch.Set("October Batch"),
		db.Pack.Schedule.Set("https://vaishnav.info"),
	).Exec(ctx)
	if err != nil {
		return c.Status(500).SendString("Error while adding pack 1.")
	}

	// Create 2 tests for Pack 1
	err = createTests(packOne.ID, 2)
	if err != nil {
		return err
	}

	// Create Pack 2
	packTwo, err := client.Pack.CreateOne(
		db.Pack.Prize.Set(4000),
		db.Pack.Title.Set("Pack - 02"),
		db.Pack.Subtitle.Set("Subtitle of the pack-2"),
		db.Pack.Description.Set("Descriptions of the pack-2"),
		db.Pack.Batch.Set("October Batch-2"),
		db.Pack.Schedule.Set("https://vaishnav.info"),
	).Exec(ctx)
	if err != nil {
		return c.Status(500).SendString("Error while adding pack 2.")
	}

	// Create 3 tests for Pack 2
	err = createTests(packTwo.ID, 3)
	if err != nil {
		return err
	}

	return c.SendString("Packs, tests, sections, and questions created successfully.")
}
