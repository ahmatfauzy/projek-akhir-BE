import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create
export const createGenre = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await prisma.genre.create({
      data: {
        name: name,
      },
    });
    res.status(200).json({
      data: result,
      message: "succes",
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create genre" });
  }
};

// get
export const getGenre = async (req: Request, res: Response) => {
  try {
    const result = await prisma.genre.findMany({
      include: {
        books: true,
      },
    });
    res.status(200).send({
      data: result,
      message: "success",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: "Failed get genre",
    });
  }
};

// update
export const updateGenre = async (res: Response, req: Request) => {
  try {
    const result = await prisma.genre.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.status(200).send({
      message: "update genre succes",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(505).send({
      message: "update genre invalid",
    });
  }
};

// delete
export const deleteGenre = async (res: Response, req: Request) => {
  try {
    const result = await prisma.genre.delete({
      where: { id: req.params.id },
      include: {
        books: true,
      },
    });

    res.status(200).send({
      message: "Genre deleted successfully",
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
