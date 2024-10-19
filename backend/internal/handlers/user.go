package handlers

import (
	"fmt"
	"errors"
	"github.com/gofiber/fiber/v2"
	"github.com/palvevaishnav/newQuizrr/backend/prisma"
    "github.com/palvevaishnav/newQuizrr/backend/prisma/db"
)

type userParser struct {
	ProviderID string `json:"providerId"`
	Email string `json:"email"`
	Name string `json:"name"`
}

func UserLoginHandler(c *fiber.Ctx) error{
	client := prisma.GetClient()
	// dataReceived := c.Body()
	// fmt.Println("Received this : %s\n", string(dataReceived))
	// return c.SendString("Data Received !!",)

	receivedUser := new(userParser)

	// do we have to pass the address or reference here
	err := c.BodyParser(receivedUser)
	if(err != nil){
		fmt.Println("Parsing me issue hai")
		return c.Status(fiber.StatusInternalServerError).SendString("Parsing Issue")
	}
	fmt.Println("Parsing okay")
	newUser,err := client.User.FindFirst(
		db.User.Email.Equals(receivedUser.Email),	
	).Exec(c.Context())
	if errors.Is(err, db.ErrNotFound) {
		fmt.Println("No record Found, Let's Create one !!")
		// create here
		createdUser ,err := client.User.CreateOne(			
			db.User.Name.Set(receivedUser.Name),
			db.User.ProviderID.Set(receivedUser.ProviderID),  
			db.User.Email.Set(receivedUser.Email),
		).Exec(c.Context())
		if(err != nil){
			fmt.Println("----error while adding new user in DB-----")
			return c.Status(fiber.StatusInternalServerError).SendString("Error While creating new use")
		}
		fmt.Println("--new user created ---")
		return c.Status(fiber.StatusOK).JSON(createdUser)
	} else if err != nil {
		fmt.Println("error occurred: %s", err)
	}
	return c.Status(fiber.StatusOK).JSON(newUser)
}







