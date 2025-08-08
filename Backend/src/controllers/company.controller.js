import companyService from "../services/company.service.js";

const create = async (req, res, next) => {
  const { name, link, email, gift } = req.body;
  try {
    const newCompany = await companyService.create({
      name,
      link,
      email,
      gift,
    });
    res.status(201).json(newCompany);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const allCompanys = await companyService.list();
    res.status(200).json(allCompanys);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const companyById = await companyService.getById(id);
    res.status(200).json(companyById);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { name, link, email, gift } = req.body;

  try {
    const updatedCompany = await companyService.update(id, {
      name,
      link,
      email,
      gift,
    });
    res.status(201).json(updatedCompany);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedCompany = await companyService.destroy(id);
    res.status(200).json({ deletedCompany });
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
};
