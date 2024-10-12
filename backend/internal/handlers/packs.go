package handlers

import(
	"fmt"
	"context"
	"encoding/json"
    "github.com/gofiber/fiber/v2"
	"github.com/palvevaishnav/newQuizrr/backend/prisma"
    "github.com/palvevaishnav/newQuizrr/backend/prisma/db"
	"github.com/steebchen/prisma-client-go/runtime/types"

)


func AddPackHandler(c *fiber.Ctx) error{
	client := prisma.GetClient()
	if err := client.Prisma.Connect(); err != nil {
		return err
	}
	defer client.Prisma.Disconnect()
	Ctx := context.Background()
	// packOne,err := client.Pack.CreateOne(
	// 	db.Pack.Prize.Set(4000),
	// 	db.Pack.Title.Set("Pack - 01"),
	// 	db.Pack.Subtitle.Set("Subtitle of the pack"),
	// 	db.Pack.Description.Set("Descriptions of the pack"),
	// 	db.Pack.Batch.Set("October Batch"),
	// 	db.Pack.Schedule.Set("https://vaishnav.info"),
	// ).Exec(Ctx)
	// if err != nil {
	// 	return c.Status(500).SendString("Error while adding pack.")
	// }
	packTwo,err := client.Pack.CreateOne(
		db.Pack.Prize.Set(4000),
		db.Pack.Title.Set("Pack - 02"),
		db.Pack.Subtitle.Set("Subtitle of the pack-2"),
		db.Pack.Description.Set("Descriptions of the pack-2"),
		db.Pack.Batch.Set("October Batch -2"),
		db.Pack.Schedule.Set("https://vaishnav.info"),
	).Exec(Ctx)
	if err != nil {
		return c.Status(500).SendString("Error while adding pack.2")
	}

	TestOne, err := client.Test.CreateOne(
		db.Test.Title.Set("Test title"),
		db.Test.NumberOfQuestions.Set(30),
		db.Test.MaxMarks.Set(100),
		db.Test.TestTime.Set(120),
		db.Test.IsLocked.Set(false),
		db.Test.Packs.Link(
			db.Pack.ID.Equals(packTwo.ID),
		),
	).Exec(Ctx)
	if err != nil {
		return c.Status(500).SendString("Error while adding test.")
	}

	sectionOne,err := client.Section.CreateOne(
		db.Section.Title.Set("Section-1"),
		db.Section.MaxMarks.Set(40),
		db.Section.Test.Link(
			db.Test.ID.Equals(TestOne.ID),
		),
	).Exec(Ctx)
	if err != nil {
		return c.Status(500).SendString("Error while adding Section.")
	}

	// Pain it the Ass
	options := []string{"Option 1", "Option 2", "Option 3", "Option 4"}
	optionsJSON, err := json.Marshal(options)
	if err != nil {
		return fmt.Errorf("could not marshal options: %w", err)
	}

	// Convert the marshaled options into types.JSON
	optionsType := types.JSON(optionsJSON)

	questionOne,err := client.Question.CreateOne(
		db.Question.Question.Set("What is this, this should be the question"),
		db.Question.Options.Set(optionsType),
		db.Question.Answer.Set(2),
		db.Question.Marks.Set(4),
		db.Question.Section.Link(
			db.Section.ID.Equals(sectionOne.ID),
		),
	).Exec(Ctx)
	if err != nil {
		return c.Status(500).SendString("Error while adding Question.")
	}

	return c.JSON(questionOne)
}


