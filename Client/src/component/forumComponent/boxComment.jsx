import { useEffect, useState } from "react";
import CommentItem from "./commentComponent/commentItem";
import CommentInput from "./commentComponent/commentInput";
import { useUser } from "../../contexts/UserContext";
import { deleteComment, getALLComment, postWriteComment, updateComment } from "../../services/commentServices";
import socket from "../../services/socket";  // Import socket đã cấu hình sẵn

const BoxComment = ({ question_id }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useUser();

  // Fetch all comments when question_id changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await getALLComment(question_id);
        console.log(data);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [question_id]);

  // Lắng nghe sự kiện 'newComment' từ server
  useEffect(() => {
    socket.on("newComment", (commentData) => {
      setComments((prevComments) => [commentData, ...prevComments]);
    });

    // Cleanup khi component bị unmount
    return () => {
      socket.off("newComment");
    };
  }, []);

  // Submit a new comment
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    const newCommentObject = {
      user_id: user.id,
      user: user.full_name,
      body: newComment,
      question_id,
      votes: 0,
    };

    try {
      // Gửi sự kiện bình luận mới lên server qua WebSocket
      socket.emit("newComment", newCommentObject);

      // Cập nhật UI ngay lập tức mà không cần chờ server phản hồi
      setComments([newCommentObject, ...comments]);
      setNewComment(""); // Reset the input field

      // Gửi bình luận lên server thông qua API để lưu vào DB
      await postWriteComment(newCommentObject);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Edit a comment
  const handleEditComment = async (comment_id, updatedText) => {
    try {
      const { data } = await updateComment(comment_id, updatedText);
      setComments(comments.map((comment) => 
        comment.id === comment_id ? { ...comment, body: data.body } : comment
      ));
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  // Delete a comment
  const handleDeleteComment = async (comment_id) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa bình luận này?");
    if (!isConfirmed) return;
    try {
      await deleteComment(comment_id);
      setComments(comments.filter((comment) => comment.id !== comment_id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="mt-4 bg-white rounded-lg shadow-md border p-3">
      <CommentInput
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        onSubmit={handleCommentSubmit}
        placeholder="Viết bình luận..."
      />
      <div className="space-y-4 mt-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onEdit={(updatedText) => handleEditComment(comment.id, updatedText)}
            onDelete={() => handleDeleteComment(comment.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BoxComment;
