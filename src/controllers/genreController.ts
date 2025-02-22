// import express, { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// // create
// export const createGenre = async (req: Request, res: Response) => {
//   const { name } = req.body;
//   try {
//     const result = await prisma.genre.create({
//       data: {
//         name: name,
//       },
//     });
//     res.status(200).send({
//       data: result,
//       message: "success create new genre",
//     });
//   } catch (error) {
//     res.status(500).send({
//       error: "Failed to create genre",
//     });
//   }
// };

// // get
// export const getGenre = async (req: Request, res: Response) => {
//   try {
//     const result = await prisma.genre.findMany({
//       include: {
//         books: true,
//       },
//     });
//     res.status(200).send({
//       data: result,
//       message: "success",
//     });
//   } catch (error) {
//     console.log(error);

//     res.status(500).send({
//       error: "Failed get genre",
//     });
//   }
// };

// // update
// export const updateGenre = async (req: Request, res: Response) => {
//   try {
//     const result = await prisma.genre.update({
//       where: {
//         id: req.params.id,
//       },
//       data: req.body,
//     });

//     res.status(200).send({
//       message: "update genre succes",
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);

//     if (error.code == "P2025") {
//       res.status(404).send({
//         message: "ID Invalid",
//       });
//     } else {
//       res.status(505).send({
//         message: "update genre invalid",
//       });
//     }
//   }
// };

// // delete
// export const deleteGenre = async (res: Response, req: Request) => {
//   try {
//     const result = await prisma.genre.delete({
//       where: { id: req.params.id },
//       include: {
//         books: true,
//       },
//     });

//     res.status(200).send({
//       message: "Genre deleted successfully",
//       data: result,
//     });
//   } catch (error) {
//     console.log(error);

//     if (error.code == "P2025") {
//       res.status(404).send({
//         message: "id invalid",
//       });
//     } else {
//       res.status(500).send({
//         message: "Error deleting user",
//       });
//     }
//   }
// };


import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create Genre
export const createGenre = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const result = await prisma.genre.create({
      data: { name },
    });
    res.status(200).send({ data: result, message: "Success create new genre" });
  } catch (error) {
    res.status(500).send({ error: "Failed to create genre" });
  }
};

// Get Genre
export const getGenre = async (req: Request, res: Response) => {
  try {
    const result = await prisma.genre.findMany({
      include: { books: true },
    });
    res.status(200).send({ data: result, message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Failed to get genre" });
  }
};

// Perbaiki urutan parameter (req dulu, lalu res)
export const updateGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }

    const result = await prisma.genre.update({
      where: { id },
      data: req.body,
    });

    res.status(200).json({ message: "Update genre success", data: result });
  } catch (error: any) {
    res.status(500).json({ message: "Update genre failed", error: error.message });
  }
};


// Delete Genre (perbaikan req dan res)
export const deleteGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "ID is required" });
      return;
    }

    await prisma.genre.delete({ where: { id } });
    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Failed to delete genre", error: error.message });
  }
};
