package handlers

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
    "github.com/palvevaishnav/newQuizrr/backend/prisma"
    "github.com/palvevaishnav/newQuizrr/backend/prisma/db"
)

/**
model Attempt {
    testId    String
    userId    String
    timeTaken Int
    score     Int // wiill fetch maxMarks from test
    mistakes  String[]
    // this will store the incorrect question id as we are not storing the answer marked 
    // by the user so, no point in creating a seperate relationship
}
*/

type dbAttemptType struct {
	TestID 		string 	`json:"testId"`
	UserID 		string 	`json:"userId"` 
	TimeTaken 	int 	`json:"timeTaken"`
	Score 		int 	`json:"score"`
	Mistakes 	[]string `json:"mistakes"`
}

func AllAttempts(c *fiber.Ctx) error{
	client := prisma.GetClient()
	attempts, err := client.Attempt.FindMany().Exec(c.Context())
	if err != nil{
		return c.Status(fiber.StatusInternalServerError).SendString("Db se nahi aya !")
	}
	return c.JSON(attempts)
}

func AttemptHandler(c *fiber.Ctx) error{
	client := prisma.GetClient()
	attempt := new(dbAttemptType)

	if err := c.BodyParser(attempt);
	err != nil{
		fmt.Println("Parsing nahi ho rahi :",err)
		return c.Status(500).SendString("Parsing Error")
	}
	// fmt.Println("Hogayi !!, data okay")

	// add to DB
	_,err := client.Attempt.CreateOne(
		db.Attempt.TestID.Set(attempt.TestID),
		db.Attempt.UserID.Set(attempt.UserID),
		db.Attempt.TimeTaken.Set(attempt.TimeTaken),
		db.Attempt.Score.Set(attempt.Score),
		db.Attempt.Mistakes.Set(attempt.Mistakes),
	).Exec(c.Context())

	if err != nil{
		// fmt.Println("DB me nahi gaya")
		return c.Status(fiber.StatusInternalServerError).SendString("DB me nahi gaya")
	}

	fmt.Println("-----Db me push Hogaya-----")

	return c.SendString("Okay hai !!")

}

/**
_, err = client.Attempt.CreateOne(
		db.Attempt.TestID.Set(id),
		db.Attempt.Marks.Set(matchingCount),
		db.Attempt.AuthID.Set(receivedData.UserId),
	).Exec(ctx)


{
    "testId": "cm25k64m70014bf2u1hvbi88y",
    "userId": "kesarnda@gmail.com",
    "timeTaken": 0,
    "score": 12,
    "mistakes": [
        "cm25k64mf0016bf2uewlzzvk3",
        "cm25k64mq0018bf2uz4vprll5",
        "cm25k64mu0019bf2u1g0txq3k",
        "cm25k64my001abf2ujh2hp6pe",
        "cm25k64ne001dbf2udsbme2n4",
        "cm25k64nj001ebf2u00codux2",
        "cm25k64no001fbf2uzjrlsfm4",
        "cm25k64ns001gbf2uphh26nnf",
        "cm25k64o6001ibf2ujcfhbzmc",
        "cm25k64oa001jbf2uty9t1ygo",
        "cm25k64og001kbf2uj7z85ssq",
        "cm25k64oq001mbf2utr7l2ie9",
        "cm25k64ov001nbf2uae9f90t7"
    ]
}
*/