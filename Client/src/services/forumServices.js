import axiosInstance from "./axios.config.js";

export const createQuestion = async (question) => {
  const url = "/forum/create-question-" + question.get("type");
  const request = await axiosInstance.post(url, question, {});
  console.log(request);
  return request.data;
};
export const getAskQuestion = async () => {
  const url = "/forum/get-all-question";
  const request = await axiosInstance.get(url, {
    params: { type: "ask" },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return request.data;
};
export const getPostQuestion = async () => {
  const url = "/forum/get-all-question";
  const request = await axiosInstance.get(url, {
    params: { type: "post" },
    headers: {
      "Content-Type": "application/json",
    },
  });
  return request.data;
};
