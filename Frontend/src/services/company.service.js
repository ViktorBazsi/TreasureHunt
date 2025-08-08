import axiosInstance from "./axiosInstance";

const listCompanies = async () => {
  try {
    const response = await axiosInstance.get("/api/company");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const getCompanyById = async (companyId) => {
  try {
    const response = await axiosInstance.get(`/api/company/${companyId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  listCompanies,
  getCompanyById,
};
