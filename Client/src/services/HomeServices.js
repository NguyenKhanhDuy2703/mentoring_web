import axiosInstance from "./axios.config";

export const homeApi = async () =>{
    const url = "/home";
    const request = await axiosInstance.get(url);
    return request.data;
}