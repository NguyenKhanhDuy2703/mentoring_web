import { useState } from "react";
import AvatarDefault from "../../assets/images/avatar_macdinh.webp";

const BoxComment = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Người dùng 1",
      body: "Đây là bình luận đầu tiên.",
      avatar: AvatarDefault,
      votes: 0,
      voted: false,
      replies: [],
      createdAt: new Date(Date.now() - 86400000), // 1 ngày trước
      edited: false
    },
    {
      id: 2,
      user: "Người dùng 2",
      body: "Đây là bình luận thứ hai.",
      avatar: AvatarDefault,
      votes: 0,
      voted: false,
      replies: [],
      createdAt: new Date(), // Bây giờ
      edited: false
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [newReply, setNewReply] = useState("");
  const [filter, setFilter] = useState("recommended");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [isReplyEditing, setIsReplyEditing] = useState(false);

  const handleCommentChange = (event) => setNewComment(event.target.value);
  const handleReplyChange = (event) => setNewReply(event.target.value);
  const handleEditChange = (event) => setEditText(event.target.value);

  const formatTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
    return date.toLocaleDateString();
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const newCommentObject = {
        id: Date.now(),
        user: "Người dùng mới",
        body: newComment,
        avatar: AvatarDefault,
        votes: 0,
        voted: false,
        replies: [],
        createdAt: new Date(),
        edited: false
      };
      setComments([newCommentObject, ...comments]);
      setNewComment("");
    }
  };

  const handleReplySubmit = (commentId) => {
    if (newReply.trim()) {
      const updatedComments = comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [...comment.replies, {
                id: Date.now(),
                user: "Người dùng mới",
                body: newReply,
                avatar: AvatarDefault,
                votes: 0,
                voted: false,
                createdAt: new Date(),
                edited: false
              }],
            }
          : comment
      );
      setComments(updatedComments);
      setReplyTo(null);
      setNewReply("");
    }
  };

  const handleVote = (commentId, isReply = false, replyId = null) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (isReply) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? { ...reply, votes: reply.votes + (reply.voted ? -1 : 1), voted: !reply.voted }
                  : reply
              ),
            };
          } else {
            return { ...comment, votes: comment.votes + (comment.voted ? -1 : 1), voted: !comment.voted };
          }
        }
        return comment;
      })
    );
  };

  const startEdit = (commentId, isReply = false, replyId = null, currentText) => {
    setEditingId({ commentId, isReply, replyId });
    setEditText(currentText);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = () => {
    if (!editText.trim()) return;
    
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === editingId.commentId) {
          if (editingId.isReply) {
            return {
              ...comment,
              replies: comment.replies.map(reply => 
                reply.id === editingId.replyId 
                  ? { ...reply, body: editText, edited: true } 
                  : reply
              )
            };
          } else {
            return { ...comment, body: editText, edited: true };
          }
        }
        return comment;
      })
    );
    
    setEditingId(null);
    setEditText("");
  };

  const confirmDelete = () => {
    if (!deletingId) return;
    
    const { commentId, isReply, replyId } = deletingId;
    
    if (isReply) {
      setComments(prevComments => 
        prevComments.map(comment => 
          comment.id === commentId
            ? { ...comment, replies: comment.replies.filter(reply => reply.id !== replyId) }
            : comment
        )
      );
    } else {
      setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    }
    
    setDeletingId(null);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (filter === "recommended") return b.votes - a.votes;
    if (filter === "most_recent") return b.createdAt - a.createdAt;
    if (filter === "least_recent") return a.createdAt - b.createdAt;
    return 0;
  });

  return (
    <div className="mt-4 bg-white rounded-lg shadow-md border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Bình luận</h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="recommended">Được đề xuất</option>
          <option value="most_recent">Mới nhất</option>
          <option value="least_recent">Cũ nhất</option>
        </select>
      </div>
      
      <div className="mt-4 flex gap-3 items-center">
        <img src={AvatarDefault} alt="Avatar" className="w-10 h-10 rounded-full" />
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
          placeholder="Viết bình luận..."
          className="w-full p-2 border rounded-lg"
        />
        <button onClick={handleCommentSubmit} className="text-blue-500">Gửi</button>
      </div>
      
      <div className="space-y-4 mt-6">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-3">
            <div className="flex gap-3 items-start">
              <img src={comment.avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
              <div className="bg-gray-100 p-3 rounded-lg w-full">
                <div className="flex justify-between items-start">
                  <p className="font-medium">{comment.user}</p>
                  <span className="text-xs text-gray-500">
                    {formatTime(comment.createdAt)}
                    {comment.edited && <span className="italic"> (đã chỉnh sửa)</span>}
                  </span>
                </div>
                
                {editingId?.commentId === comment.id && !editingId.isReply ? (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={handleEditChange}
                      className="w-full p-2 border rounded"
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={saveEdit} className="text-sm bg-blue-500 text-white px-3 py-1 rounded">
                        Lưu
                      </button>
                      <button onClick={cancelEdit} className="text-sm bg-gray-500 text-white px-3 py-1 rounded">
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600">{comment.body}</p>
                    <div className="flex gap-4 mt-2">
                      <button 
                        onClick={() => handleVote(comment.id)} 
                        className={`${comment.voted ? 'text-blue-600' : 'text-gray-500'}`}
                      >
                        {comment.voted ? "Bỏ thích" : "Thích"} ({comment.votes})
                      </button>
                      <button 
                        onClick={() => setReplyTo(comment.id)} 
                        className="text-gray-500"
                      >
                        Trả lời
                      </button>
                      <button 
                        onClick={() => startEdit(comment.id, false, null, comment.body)} 
                        className="text-gray-500"
                      >
                        Chỉnh sửa
                      </button>
                      <button 
                        onClick={() => setDeletingId({ commentId: comment.id, isReply: false })} 
                        className="text-red-500"
                      >
                        Xóa
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {comment.replies.map((reply) => (
              <div key={reply.id} className="flex gap-3 ml-10 items-start">
                <img src={reply.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                <div className="bg-gray-100 p-3 rounded-lg w-full">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-gray-800">{reply.user}</p>
                    <span className="text-xs text-gray-500">
                      {formatTime(reply.createdAt)}
                      {reply.edited && <span className="italic"> (đã chỉnh sửa)</span>}
                    </span>
                  </div>
                  
                  {editingId?.commentId === comment.id && editingId.isReply && editingId.replyId === reply.id ? (
                    <div className="mt-2">
                      <input
                        type="text"
                        value={editText}
                        onChange={handleEditChange}
                        className="w-full p-2 border rounded text-sm"
                      />
                      <div className="flex gap-2 mt-2">
                        <button onClick={saveEdit} className="text-xs bg-blue-500 text-white px-2 py-1 rounded">
                          Lưu
                        </button>
                        <button onClick={cancelEdit} className="text-xs bg-gray-500 text-white px-2 py-1 rounded">
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600">{reply.body}</p>
                      <div className="flex gap-4 mt-2">
                        <button 
                          onClick={() => handleVote(comment.id, true, reply.id)} 
                          className={`text-sm ${reply.voted ? 'text-blue-600' : 'text-gray-500'}`}
                        >
                          {reply.voted ? "Bỏ thích" : "Thích"} ({reply.votes})
                        </button>
                        <button 
                          onClick={() => startEdit(comment.id, true, reply.id, reply.body)} 
                          className="text-sm text-gray-500"
                        >
                          Chỉnh sửa
                        </button>
                        <button 
                          onClick={() => setDeletingId({ 
                            commentId: comment.id, 
                            isReply: true, 
                            replyId: reply.id 
                          })} 
                          className="text-sm text-red-500"
                        >
                          Xóa
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
            
            {replyTo === comment.id && (
              <div className="mt-2 flex gap-3 items-center ml-10">
                <img src={AvatarDefault} alt="Avatar" className="w-8 h-8 rounded-full" />
                <input
                  type="text"
                  value={newReply}
                  onChange={handleReplyChange}
                  onKeyDown={(e) => e.key === "Enter" && handleReplySubmit(comment.id)}
                  placeholder="Viết câu trả lời..."
                  className="w-full p-2 border rounded-lg text-sm"
                />
                <button onClick={() => handleReplySubmit(comment.id)} className="text-blue-500 text-sm">Gửi</button>
                <button onClick={() => setReplyTo(null)} className="text-gray-500 text-sm">Hủy</button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Modal xác nhận xóa */}
      {deletingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Xác nhận xóa</h3>
            <p>Bạn có chắc chắn muốn xóa {deletingId.isReply ? 'câu trả lời' : 'bình luận'} này?</p>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => setDeletingId(null)} 
                className="px-4 py-2 border border-gray-300 rounded"
              >
                Hủy
              </button>
              <button 
                onClick={confirmDelete} 
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoxComment;