package prisma

import (
	"log"
	"os"
	"github.com/palvevaishnav/newQuizrr/backend/prisma/db"
)

var client *db.PrismaClient

func init(){
	// if err := godotenv.Load(); err != nil {
    //     log.Fatalf("Error loading .env file")
    // }
    os.Setenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/quizrr-new")

	// creating client 
	client = db.NewClient()
	// connect 
	if err := client.Prisma.Connect();err != nil{
		log.Fatalf("Failed to Connect to DB")
	}
}

func GetClient() *db.PrismaClient{
	return client
}

func CloseClient(){
	if err:= client.Prisma.Disconnect();err != nil{
		log.Fatalf("Failed to Disconnect the DB %v",err)
	}
}


