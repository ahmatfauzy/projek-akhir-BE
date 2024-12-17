import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient();

// get author
export const getAuthors = async (req: Request, res: Response) => {
  try {
    const allAutor = await prisma.author.findMany({
      include: {
        books: true,
      },
    });
    res.status(200).send({
      data: allAutor,
      message: "success",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "Failed authors",
    });
  }
};

// create author
export const createAuthor = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await prisma.author.create({
      data: {
        name: name,
      },
    });
    res.status(0).send({
      data: result,
      message: "succes",
    });
  } catch (error) {
    res.status(500).send({ 
      error: "Failed to create author" 
    });
  }
};

// update
export const updateAuthor = async (req, res) => {
  try {
    const author = await prisma.author.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.status(200).send({
      data: author,
    });
  } catch (error) {
    console.log(error);

    if (error.code == "P2025") {
      res.status(404).send({
        message: "ID Invalid",
      });
    } else {
      res.status(500).send({
        message: "error update author",
      });
    }
  }
};

// delete
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const result = await prisma.author.delete({
      where: { id: req.params.id },
      include: {
        books: true,
      },
    });

    res.status(200).send({
      message: "AUthor deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);

    if (error.code == "P2025") {
      res.status(404).send({
        message: "id invalid",
      });
    } else {
      res.status(500).send({
        message: "Error deleting user",
      });
    }
  }
};
