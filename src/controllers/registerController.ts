import { PrismaClient } from "@prisma/client";
import bcript from "bcrypt";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const user = prisma.user;

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const hashesPassword = await bcript.hash(password, 10);
    const result = await user.create({
      data: {
        name: name,
        email: email,
        password: hashesPassword,
      },
    });
    res.status(200).send({
      data: result,
      message: "user succesfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "error register user",
    });
  }
};
