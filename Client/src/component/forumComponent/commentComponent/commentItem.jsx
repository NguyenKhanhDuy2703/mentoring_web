import { useState } from "react";
import Avatar from "../../../assets/images/avatar_macdinh.webp";
import {useUser} from "../../../contexts/UserContext";
const CommentItem = ({ comment, onVote, onReply, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.body);
  const { user } = useUser();
  const handleEdit = () => {
    if (editedText.trim()) {
      onEdit(editedText);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex gap-3 items-start py-3 border-b border-gray-200">
      <img src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
      <div className="bg-gray-100 p-3 rounded-lg w-full capitalize">
      <div className="flex items-center gap-2 mb-2">
         <p className="font-medium text-gray-900">{user.full_name}</p>
        <p className="font-medium text-blue-900">{user.role}</p>
      </div>
        
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
            className="w-full p-1 border rounded"
          />
        ) : (
          <p className="text-gray-600 border-l-2 border-blue-400 pl-3">{comment.body}</p>
        )}

        <div className="flex gap-3 mt-2 flex-wrap">
          <button onClick={onVote} className="text-gray-500 hover:text-blue-500">Thích ({comment.votes})</button>
          <button onClick={onReply} className="text-gray-500 hover:text-blue-500">Trả lời</button>
          <button onClick={() => setIsEditing(true)} className="text-gray-500 hover:text-green-500">Chỉnh sửa</button>
          <button onClick={onDelete} className="text-red-500 hover:text-red-700">Xóa</button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
