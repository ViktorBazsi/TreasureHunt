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

export default {
  checkAnswer,
};
