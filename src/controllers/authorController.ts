import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient();

// get author
export const getAuthors = async (req: Request, res: Response) => {
  try {
    const allAutor = await prisma.author.findMany();
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
    res.status(201).json({
      data: result,
      message: "succes",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create author" });
  }
};

// delete
export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const result = await prisma.author.delete({
      where: { id: req.params.id },
    });

    res.status(200).send({
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);

    if ((error = !req.params)) {
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

// update
export const updateAuthor = async (req, res) => {
  try {
    const author = await prisma.author.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.status(200).json({ data: author });
  } catch (e) {
    console.log(e);
  }
};

// delete
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await prisma.author.delete({
      where: { id: req.params.id },
    });

    res.status(200).send({
      message: "Author deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting author",
    });
  }
};

