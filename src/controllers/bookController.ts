import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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
    
  }
};
