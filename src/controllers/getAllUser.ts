import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).send({
      message: "Get users successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error get users",
    });
  }
};
