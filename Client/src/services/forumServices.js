import axiosInstance from "./axios.config.js";

export const createQuestion = async (question) => {
  const url = "/forum/create-question-" + question.get("type");
  const request = await axiosInstance.post(url, question, {});
  console.log(request);
  return request.data;
};
export const getAllQuestion = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/forum/get-all-question?page=${page}&limit=${limit}`);
  console.log(response);
  return response.data;
};
export const getQuestionFollowTags = async (name, page = 1, limit = 10) => {
  const response = await axiosInstance.get(`/forum/get-question-by-tag?name=${name}&page=${page}&limit=${limit}`);
  return response.data;
}

