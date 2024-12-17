import express, { Request, response, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { request } from "http";

const prisma = new PrismaClient();

// get book
export const getBooks = async (req: Request, res: Response) => {
  try {
    const allBook = await prisma.book.findMany();
    res.status(200).send({
      message: "success",
      data: allBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error get books",
    });
  }
};

// crate book
export const createBook = async (req: Request, res: Response) => {
  const { title, authorID, genreId } = req.body;
  try {
    const result = await prisma.book.create({
      data: {
        title,
        authorID,
        genreId,
      },
    });

    res.status(200).send({
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: "error crate book",
    });
  }
};

// update
export const updateBook = async (req: Request, res: Response) => {
  try {
    const result = await prisma.book.update({
      where: {
        id: req.params.id,
      },

      data: req.body,
    });

    res.status(0).send({
      message: "update book successelly",
      data: result,
    });
  } catch (error) {
    console.log(error);

    if (error.code == "P2025") {
      res.status(404).send({
        message: "ID Invalid",
      });
    } else {
      res.status(500).send({
        message: "error delete book",
      });
    }
  }
};

// delete
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const result = await prisma.book.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).send({
      message: "delete author success",
      data: result,
    });
  } catch (error) {
    console.log(error);

    if (error.code == "P2025") {
      res.status(404).send({
        message: "ID Invalid",
      });
    } else {
      res.status(500).send({
        message: "error delete book",
      });
    }
  }
};
