import axiosInstance from "./axios.config";

export const homeApi = async () =>{
    const url = "/home";
    const request = await axiosInstance.get(url);
    return request.data;
}
export const getAllUser = async () => {
    const url = "/home/user-get-all";
    const request = await axiosInstance.get(url);
    return request.data;
}

export const getAllTags = async () => {
    const url = "/home/tags-get-all";
    const request = await axiosInstance.get(url);
    return request.data;
}
