import axiosInstance from "./axios.config";

export const postWriteComment = async (newComment) => {
  const url = "/forum/create-comment";
  const request = await axiosInstance.post(
    url,
    newComment,
    
  );
  return request.data;
};
export const getALLComment = async (question_id) =>{
    const url = "/forum/get-comments";
    
    const request = await axiosInstance.get(url , {
        params:{
            question_id : question_id
        }
    });
    console.log(request);
    return request.data;
}
export const updateComment = async (comment_id, updatedText) => {
  const url = `/forum/edit-comment`;
  const request = await axiosInstance.put(url, { content: updatedText , comment_id :comment_id });
  return request.data;
};
export const deleteComment = async (comment_id) => {
  const url = `/forum/delete-comment?comment_id=${comment_id}`;
  const request = await axiosInstance.delete(url);
  return request.data;
};
