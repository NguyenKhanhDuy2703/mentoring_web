import {
  MessageCircle,
  ThumbsUp,
  RefreshCcw,
  Bookmark,
  X,
} from "lucide-react";
import { useContext } from "react";
import { QuestionContext } from "../../pages/forum/mainForum.jsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import AvatarDefault from "../../assets/images/avatar_macdinh.webp";
import "dayjs/locale/vi";
dayjs.extend(relativeTime);
dayjs.locale("vi");
const PostCard = () => {
  const inforPost = useContext(QuestionContext);

  return (
    <div className="flex flex-col space-y-6">
      {inforPost?.data?.map((post) => {
        // Sử dụng avatar từ user, nếu không có dùng AvatarDefault
        const avatarSrc = post.user?.avatar || AvatarDefault;

        return (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={avatarSrc}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-800 capitalize">
                      {post.user?.full_name || "Người dùng ẩn danh"}
                    </span>{" "}
                    • {dayjs(post.createdAt).fromNow()}
                  </p>
                  <span className="text-xs font-medium px-2 py-1 bg-blue-500 text-white rounded capitalize">
                    {post.user?.role || "No role"}
                  </span>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 mb-2 ">{post.title}</h2>

            {/* Content */}
            <p className="text-gray-700 mb-3 border-l-2 border-blue-300 px-2 ">
              {post.body || "No content available"}
            </p>

            {/* Hình ảnh: Chỉ hiển thị nếu bài là "post" và có hình ảnh */}
            {post.type === "post" && post.image && (
              <div className="w-full flex justify-center mb-4">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-auto max-h-[300px] object-contain rounded-lg"
                />
              </div>
            )}

            {/* Tags */}
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <button
                    key={index}
                    className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded hover:bg-gray-300"
                  >
                    #{tag.name.trim()}
                  </button>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3.5 border-t border-gray-200 pt-3">
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition">
                <ThumbsUp size={16} /> <span>Upvote</span>
              </button>
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition">
                <MessageCircle size={16} /> <span>Comment</span>
              </button>
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition">
                <RefreshCcw size={16} /> <span>Share</span>
              </button>
              <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition">
                <Bookmark size={16} /> <span>Follow</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostCard;
