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
export const getAllTag = async () => {
    const url = "/home/get-all-tags";
    const request = await axiosInstance.get(url);
    return request.data;
}
