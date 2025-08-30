import axiosInstance from "./axiosInstance";

const checkAnswer = async (treasureId, answer) => {
  try {
    const response = await axiosInstance.post(
      `/api/treasure/${treasureId}/check`,
      {
        answer,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const begin = async () => {
  try {
    const response = await axiosInstance.post("/api/treasure/begin");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const getMyTreasures = async () => {
  try {
    const response = await axiosInstance.get("/api/treasure/my");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  checkAnswer,
  begin,
  getMyTreasures,
};
