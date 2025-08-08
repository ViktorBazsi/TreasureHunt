import treasureService from "../services/treasure.service.js";

const create = async (req, res, next) => {
  const { number, question, hint, answer, correctAns, companyId } = req.body;
  try {
    const newTreasure = await treasureService.create({
      number,
      question,
      hint,
      answer,
      correctAns,
      companyId,
    });
    res.status(201).json(newTreasure);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const allTreasures = await treasureService.list();
    res.status(200).json(allTreasures);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const treasureById = await treasureService.getById(id);
    res.status(200).json(treasureById);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { number, question, hint, answer, correctAns, companyId } = req.body;

  try {
    const updatedTreasure = await treasureService.update(id, {
      number,
      question,
      hint,
      answer,
      correctAns,
      companyId,
    });
    res.status(201).json(updatedTreasure);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedTreasure = await treasureService.destroy(id);
    res.status(200).json({ deletedTreasure });
  } catch (error) {
    next(error);
  }
};

// EXTRA
const checkAnswer = async (req, res, next) => {
  const { id: treasureId } = req.params; // Treasure ID a URL-ben
  const { answer } = req.body; // answer a body-ban
  const userId = req.user?.id; // feltételezve, hogy auth middleware kitölti ezt

  if (!userId) {
    return res.status(401).json({ message: "Bejelentkezés szükséges" });
  }

  try {
    const progress = await treasureService.checkAnswer({
      treasureId,
      userId,
      answer,
    });
    res.status(200).json({ message: "Helyes válasz!", progress });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  list,
  getById,
  update,
  destroy,
  //   EXTRA
  checkAnswer,
};
