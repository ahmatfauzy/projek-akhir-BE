import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.delete({
      where: { id: req.params.id },
    });

    res.status(200).send({
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error deleting user",
    });
  }
};
