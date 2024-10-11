package main

import (
	"context"
	"log"
	"time"

	"github.com/steebchen/prisma-client-go/runtime/transaction"
	"github.com/palvevaishnav/newQuizrr/backend/prisma"
)

func main() {
	client := prisma.NewClient()
	defer client.Disconnect()

	ctx := context.Background()

	// Start a transaction to ensure consistency
	tx, err := client.$transaction.Begin(ctx, transaction.Options{})
	if err != nil {
		log.Fatalf("failed to start transaction: %v", err)
	}

	// Seed Questions
	question1, err := client.Question.CreateOne(
		prisma.Question.Question.Set("What is the capital of France?"),
		prisma.Question.Options.Set([]string{"Paris", "London", "Berlin", "Rome"}),
		prisma.Question.Answer.Set(0), // correct answer index
		prisma.Question.Marks.Set(5),
	).Exec(ctx)
	if err != nil {
		tx.Rollback(ctx)
		log.Fatalf("failed to create question1: %v", err)
	}

	question2, err := client.Question.CreateOne(
		prisma.Question.Question.Set("Which planet is known as the Red Planet?"),
		prisma.Question.Options.Set([]string{"Earth", "Mars", "Jupiter", "Venus"}),
		prisma.Question.Answer.Set(1), // correct answer index
		prisma.Question.Marks.Set(5),
	).Exec(ctx)
	if err != nil {
		tx.Rollback(ctx)
		log.Fatalf("failed to create question2: %v", err)
	}

	// Seed Section
	section1, err := client.Section.CreateOne(
		prisma.Section.Title.Set("Geography"),
		prisma.Section.MaxMarks.Set(10),
		prisma.Section.Questions.Link([]string{question1.ID, question2.ID}),
	).Exec(ctx)
	if err != nil {
		tx.Rollback(ctx)
		log.Fatalf("failed to create section: %v", err)
	}

	// Seed Test
	test1, err := client.Test.CreateOne(
		prisma.Test.Title.Set("General Knowledge Test"),
		prisma.Test.CreatedAt.Set(time.Now()),
		prisma.Test.NumberOfQuestions.Set(2),
		prisma.Test.MaxMarks.Set(10),
		prisma.Test.TestTime.Set(60),
		prisma.Test.IsLocked.Set(false),
		prisma.Test.Sections.Link([]string{section1.ID}),
	).Exec(ctx)
	if err != nil {
		tx.Rollback(ctx)
		log.Fatalf("failed to create test: %v", err)
	}

	// Seed Pack
	_, err = client.Pack.CreateOne(
		prisma.Pack.Title.Set("Quiz Pack 1"),
		prisma.Pack.Prize.Set(100),
		prisma.Pack.Subtitle.Set("First Quiz Pack"),
		prisma.Pack.Description.Set("A pack of various tests"),
		prisma.Pack.Batch.Set("Batch A"),
		prisma.Pack.Schedule.Set("http://example.com/schedule.pdf"),
		prisma.Pack.Tests.Link([]string{test1.ID}),
	).Exec(ctx)
	if err != nil {
		tx.Rollback(ctx)
		log.Fatalf("failed to create pack: %v", err)
	}

	// Commit the transaction
	if err := tx.Commit(ctx); err != nil {
		log.Fatalf("failed to commit transaction: %v", err)
	}

	log.Println("Seeding completed successfully!")
}
