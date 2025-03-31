import { useState } from "react";
import AvatarDefault from "../../assets/images/avatar_macdinh.webp"; // Bạn có thể thay thế bằng ảnh đại diện của người dùng

const BoxComment = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Người dùng 1",
      body: "Đây là bình luận đầu tiên.",
      avatar: AvatarDefault,
      votes: 0,
      replies: [
        {
          id: 1,
          user: "Người dùng 2",
          body: "Đây là một câu trả lời cho bình luận đầu tiên.",
          avatar: AvatarDefault,
          votes: 0,
        },
      ],
    },
    {
      id: 2,
      user: "Người dùng 2",
      body: "Đây là bình luận thứ hai.",
      avatar: AvatarDefault,
      votes: 0,
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [newReply, setNewReply] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleReplyChange = (event) => {
    setNewReply(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObject = {
        id: comments.length + 1,
        user: "Người dùng mới", // Tên người dùng có thể lấy từ context hoặc API
        body: newComment,
        avatar: AvatarDefault,
        votes: 0,
        replies: [],
      };

      setComments([newCommentObject, ...comments]);
      setNewComment(""); // Reset input field
    }
  };

  const handleReplySubmit = (commentId) => {
    if (newReply.trim()) {
      const updatedComments = comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: comment.replies.length + 1,
                  user: "Người dùng mới",
                  body: newReply,
                  avatar: AvatarDefault,
                  votes: 0,
                },
              ],
            }
          : comment
      );
      setComments(updatedComments);
      setReplyTo(null); // Reset reply target
      setNewReply(""); // Reset reply input field
    }
  };

  const handleVote = (commentId, isReply = false, replyId = null) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (isReply) {
            const updatedReplies = comment.replies.map((reply) =>
              reply.id === replyId
                ? { ...reply, votes: reply.votes + 1 }
                : reply
            );
            return { ...comment, replies: updatedReplies };
          } else {
            return { ...comment, votes: comment.votes + 1 };
          }
        }
        return comment;
      })
    );
  };

  return (
    <div className="mt-4 bg-white rounded-lg shadow-md border border-gray-200 p-4">
      {/* Form nhập bình luận mới */}
      <div className="mt-4 flex gap-3 items-center">
        <img
          src={AvatarDefault}
          alt="Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
          placeholder="Viết bình luận..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleCommentSubmit}
          className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out"
        >
          Gửi
        </button>
      </div>

      {/* Hiển thị danh sách bình luận */}
      <div className="space-y-4 mt-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col space-y-3">
            <div className="flex gap-3 items-start">
              <img
                src={comment.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="bg-gray-100 p-3 rounded-lg w-full">
                <p className="text-sm font-medium text-gray-800">{comment.user}</p>
                <p className="text-sm text-gray-600">{comment.body}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => handleVote(comment.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Thích ({comment.votes})
                  </button>
                  <button
                    onClick={() => setReplyTo(comment.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Trả lời
                  </button>
                </div>
              </div>
            </div>

            {/* Hiển thị các reply */}
            {comment.replies.map((reply) => (
              <div key={reply.id} className="flex gap-3 ml-6 items-start">
                <img
                  src={reply.avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="bg-gray-100 p-3 rounded-lg w-full">
                  <p className="text-sm font-medium text-gray-800">{reply.user}</p>
                  <p className="text-sm text-gray-600">{reply.body}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => handleVote(comment.id, true, reply.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Thích ({reply.votes})
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Form trả lời bình luận */}
            {replyTo === comment.id && (
              <div className="mt-4 flex gap-3 items-center ml-6">
                <img
                  src={AvatarDefault}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <input
                  type="text"
                  value={newReply}
                  onChange={handleReplyChange}
                  onKeyDown={(e) => e.key === "Enter" && handleReplySubmit(comment.id)}
                  placeholder="Viết câu trả lời..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => handleReplySubmit(comment.id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Gửi
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoxComment;
