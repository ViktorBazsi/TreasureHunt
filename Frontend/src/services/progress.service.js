import axiosInstance from "./axiosInstance";

const getMyProgress = async () => {
  try {
    const response = await axiosInstance.get("/api/user/progress");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const beginProgress = async () => {
  try {
    const response = await axiosInstance.post("/api/treasure/begin");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  getMyProgress,
  beginProgress,
};
