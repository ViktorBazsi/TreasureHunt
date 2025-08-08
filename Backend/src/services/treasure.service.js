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
const cleanText = (text) => {
  return text
    .trim()
    .toLowerCase()
    .replace(/[.!?]+$/, ""); // eltávolítja a mondatvégi írásjelet
};

const checkAnswer = async ({ treasureId, userId, answer }) => {
  const treasure = await prisma.treasure.findUnique({
    where: { id: treasureId },
  });

  if (!treasure) {
    throw new HttpError("Kincs nem található", 404);
  }

  const userAnswer = cleanText(answer);
  const correctAnswer = cleanText(treasure.correctAns);

  if (userAnswer !== correctAnswer) {
    throw new HttpError("Helytelen válasz", 400);
  }

  // helyes válasz → létrehozás vagy frissítés a progress táblában
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

  return progress;
};

export default {
  create,
  list,
  getById,
  update,
  destroy,
  //   EXTRA:
  checkAnswer,
};
