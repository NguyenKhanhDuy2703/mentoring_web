import { UserPlus, MessageCircle, Heart, X } from "lucide-react";
import { useContext } from "react";
import { PostContext } from "../../pages/forum/mainForum.jsx";

const PostCard = () => {
  const inforPost = useContext(PostContext);

  return (
    <div className="flex flex-col  text-black space-y-5">
      {inforPost?.data.map((post) => (
        <div key={post.id} className=" border border-gray-200   rounded-lg shadow-lg  p-5">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-300 pb-2">
            <div className="flex items-center gap-3">
              <img
                src={post.avatar || "https://via.placeholder.com/50"}
                alt="Avatar"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-700 capitalize">
                  {post.user?.full_name || "Người dùng ẩn danh"}
                </p>
                <span className="px-2 py-0.5 text-xs font-semibold text-white bg-blue-500 rounded-md">
                  {post.user?.role || "Thành viên"}
                </span>
              </div>
            </div>
            <button className="text-gray-600 hover:text-black">
              <X size={22} />
            </button>
          </div>

          {/* Nội dung bài viết */}
          <div className="mt-2">
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-sm text-gray-700">{post.content}</p>
          </div>

          {/* Hiển thị Tags nếu có */}
          {post.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm font-medium px-3 py-1 bg-gray-200 text-gray-700 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Hình ảnh bài viết (tự động căn chỉnh & giới hạn kích thước) */}
          {post.image && (
            <div className="w-full max-h-[400px] flex justify-center mt-2">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-auto max-h-[400px] object-contain rounded-lg"
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center mt-3 text-gray-600">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 hover:text-red-400">
                <Heart className="w-5 h-5" />
                <span>{post.likes || 0}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments || 0}</span>
              </button>
            </div>
            <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-lg">
              <UserPlus className="w-5 h-5" />
              <span>Gửi yêu cầu tham gia</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
