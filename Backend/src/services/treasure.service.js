import prisma from "../models/prisma-client.js";
import { isValidTreasureId } from "../utils/validation.utils.js";
import HttpError from "../utils/HttpError.js";

const create = async ({
  number,
  question,
  hint,
  answer,
  correctAns,
  companyId,
}) => {
  const newTreasure = await prisma.treasure.create({
    data: {
      number,
      question,
      hint,
      answer,
      correctAns,
      company: {
        connect: { id: companyId },
      },
    },
  });
  return newTreasure;
};

const list = async () => {
  const allTreasures = await prisma.treasure.findMany();
  return allTreasures;
};

const getById = async (id) => {
  await isValidTreasureId(id);
  const treasureById = await prisma.treasure.findUnique({
    where: { id },
    include: {
      company: true,
    },
  });
  return treasureById;
};

const update = async (id, treasureData) => {
  await isValidTreasureId(id);

  const { companyId, ...restData } = treasureData;

  const updatedTreasure = await prisma.treasure.update({
    where: { id },
    data: {
      ...restData,
      ...(companyId && {
        company: {
          connect: { id: companyId },
        },
      }),
    },
  });

  return updatedTreasure;
};

const destroy = async (id) => {
  await isValidTreasureId(id);

  await prisma.treasure.update({
    where: { id },
    data: {
      company: {
        disconnect: true,
      },
    },
  });

  const deletedTreasure = await prisma.treasure.delete({
    where: { id },
  });

  return deletedTreasure;
};

// EXTRA:
// ANSWER:
const cleanText = (text) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/, ""); // eltávolítja a mondatvégi írásjelet
};

// const checkAnswer = async ({ treasureId, userId, answer }) => {
//   const treasure = await prisma.treasure.findUnique({
//     where: { id: treasureId },
//   });

//   if (!treasure) {
//     throw new HttpError("Kincs nem található", 404);
//   }

//   const userAnswer = cleanText(answer);
//   const correctAnswer = cleanText(treasure.correctAns);

//   if (userAnswer !== correctAnswer) {
//     throw new HttpError("Helytelen válasz", 400);
//   }

//   // helyes válasz → létrehozás vagy frissítés a progress táblában
//   const progress = await prisma.userTreasureProgress.upsert({
//     where: {
//       userId_treasureId: {
//         userId,
//         treasureId,
//       },
//     },
//     update: {
//       isOpen: true,
//     },
//     create: {
//       userId,
//       treasureId,
//       isOpen: true,
//     },
//   });

//   return progress;
// };
// VOL.2:
const checkAnswer = async ({ treasureId, userId, answer }) => {
  const treasure = await prisma.treasure.findUnique({
    where: { id: treasureId },
  });

  if (!treasure) {
    throw new HttpError("Kincs nem található", 404);
  }

  const userAnswer = cleanText(answer);
  const correctAnswer = cleanText(treasure.correctAns);

  const isCorrect = userAnswer === correctAnswer;

  if (!isCorrect) {
    return { isCorrect: false };
  }

  const progress = await prisma.userTreasureProgress.upsert({
    where: {
      userId_treasureId: {
        userId,
        treasureId,
      },
    },
    update: {
      isOpen: true,
    },
    create: {
      userId,
      treasureId,
      isOpen: true,
    },
  });

  return { isCorrect: true, progress };
};

// BEGIN:
const beginForUser = async (userId) => {
  const treasures = await prisma.treasure.findMany({
    select: { id: true },
  });

  if (!treasures.length) {
    throw new HttpError("Nincs elérhető kincs", 404);
  }

  const existingProgress = await prisma.userTreasureProgress.findMany({
    where: {
      userId,
    },
    select: {
      treasureId: true,
    },
  });

  const alreadyConnected = new Set(existingProgress.map((p) => p.treasureId));

  const newProgressRecords = treasures
    .filter((treasure) => !alreadyConnected.has(treasure.id))
    .map((treasure) => ({
      userId,
      treasureId: treasure.id,
      isOpen: false,
    }));

  if (newProgressRecords.length === 0) {
    return {
      message: "Már minden kincs hozzá van rendelve ehhez a felhasználóhoz.",
    };
  }

  await prisma.userTreasureProgress.createMany({
    data: newProgressRecords,
  });

  return {
    message: "Kincsek összekapcsolva a felhasználóval",
    count: newProgressRecords.length,
  };
};

// Lekérdezi a bejelentkezett userhez tartozó kincseket a progress adatokkal együtt
const getTreasuresByUserId = async (userId) => {
  return prisma.treasure.findMany({
    include: {
      progress: {
        where: { userId },
      },
      company: true,
    },
    orderBy: {
      number: "asc",
    },
  });
};

export default {
  create,
  list,
  getById,
  update,
  destroy,
  //   EXTRA:
  checkAnswer,
  beginForUser,
  getTreasuresByUserId,
};
