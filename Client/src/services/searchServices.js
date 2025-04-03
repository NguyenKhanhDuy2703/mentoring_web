import axiosInstance from "./axios.config";

export const searchEverything = async (query) => {
  try {
    const response = await axiosInstance.get("home/search", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};
export const searchTags = async (query) => {
  try {
    // Gửi yêu cầu tìm kiếm tag đến backend
    const response = await axiosInstance.get("home/search-tags", {
      params: { query },
    });
    
    // Trả về danh sách các tag tìm được
    return response.data;
  } catch (error) {
    console.error("Error fetching search results for tags:", error);
    throw error;  // Ném lỗi để có thể xử lý ngoài hàm này
  }
};