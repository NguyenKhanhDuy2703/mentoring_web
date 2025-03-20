import axiosInstance from "./axios.config.js";

export const createQuestion = async (question) => {
    const url = "/forum/create-question";
    const request = await axiosInstance.post(url, question);
    console.log(request);
    return request.data;
}