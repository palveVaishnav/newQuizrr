package seed

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/palvevaishnav/newQuizrr/backend/prisma"
    "github.com/palvevaishnav/newQuizrr/backend/prisma/db"
	"github.com/steebchen/prisma-client-go/runtime/types"
)

func SeedDatabase() {
	if err := seed(); err != nil {
		log.Fatalf("Error seeding data: %v", err)
	}
}

func seed() error {
	// Initialize Prisma client	
	client := prisma.GetClient()
	if err := client.Prisma.Connect(); err != nil {
		return err
	}
	defer client.Prisma.Disconnect()

	Ctx := context.Background()

	packOne,err := client.Pack.CreateOne(
		db.Pack.Prize.Set(4000),
		db.Pack.Title.Set("Pack - 01"),
		db.Pack.Subtitle.Set("Subtitle of the pack"),
		db.Pack.Description.Set("Descriptions of the pack"),
		db.Pack.Batch.Set("October Batch"),
		db.Pack.Schedule.Set("https://vaishnav.info"),
	).Exec(Ctx)
	if err != nil{
		return fmt.Errorf
	}
	return nil
}
