import prisma from "../models/prisma-client.js";
import { isValidCompanyId } from "../utils/validation.utils.js";

const create = async ({ name, link, email, gift }) => {
  const newCompany = await prisma.company.create({
    data: {
      name,
      link,
      email,
      gift,
    },
  });
  return newCompany;
};

const list = async () => {
  const allCompanys = await prisma.company.findMany();
  return allCompanys;
};

const getById = async (id) => {
  await isValidCompanyId(id);
  const CompanyById = await prisma.company.findUnique({
    where: { id },
    include: {
      tresures: true,
    },
  });
  return CompanyById;
};

const update = async (id, companyData) => {
  await isValidCompanyId(id);
  const updatedCompany = await prisma.company.update({
    where: { id },
    data: { ...companyData },
  });
  return updatedCompany;
};

const destroy = async (id) => {
  await isValidCompanyId(id);
  const deletedCompany = await prisma.company.delete({
    where: { id },
  });
  return deletedCompany;
};

export default {
  create,
  list,
  getById,
  update,
  destroy,
};
