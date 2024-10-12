package handlers

import (
    "github.com/gofiber/fiber/v2"
    "github.com/palvevaishnav/newQuizrr/backend/prisma"
    "github.com/palvevaishnav/newQuizrr/backend/prisma/db"
)

func AllPacksHandler(c *fiber.Ctx) error {
    client := prisma.GetClient()
    allPacks, err := client.Pack.FindMany().Exec(c.Context())
    if err != nil {
        return c.Status(500).SendString("Error while fetching data.")
    }
    return c.JSON(allPacks)
}

func PackByIdHandler(c *fiber.Ctx) error {
    client := prisma.GetClient()
    id := c.Params("id")

    pack, err := client.Pack.FindUnique(
        db.Pack.ID.Equals(id),
    ).Exec(c.Context())
    if err != nil {
        return c.Status(500).SendString("Error while fetching data.")
    }
    return c.JSON(pack)
}