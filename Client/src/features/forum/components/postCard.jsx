import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import AvatarDefault from "../../../assets/images/avatar_macdinh.webp";
import { MessageSquare, Heart, BookmarkPlus, Share2 } from "lucide-react";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const PostCard = ({ posts }) => {
  if (!posts.length) {
    return (
      <div className="flex justify-center items-center p-8 bg-white rounded-lg shadow">
        <p className="text-gray-500">Chưa có bài đăng nào.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6">
      {posts.map((post) => {
        const avatarSrc = post.user?.avatar || AvatarDefault;

        return (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 overflow-hidden"
          >
            {/* User info and post header */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={avatarSrc}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                  />
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-800 capitalize hover:text-blue-600 cursor-pointer">
                        {post.user?.full_name || "Người dùng ẩn danh"}
                      </span>{" "}
                      • {dayjs(post.createdAt).fromNow()}
                    </p>
                    <span className="text-xs font-medium px-2 py-1 bg-blue-600 text-white rounded-full capitalize">
                      {post.user?.role || "No role"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Post title and content */}
              <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600 cursor-pointer">
                {post.title}
              </h2>

              <p className="text-gray-700 mb-4 border-l-3 border-blue-400 pl-3 py-1 bg-blue-50 rounded-r-md">
                {post.body || "No content available"}
              </p>

              {/* Post image if available */}
              {post.type === "post" && post.image && (
                <div className="w-full mb-4">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-auto max-h-[300px] object-contain rounded-lg shadow-sm hover:opacity-95 transition-opacity cursor-zoom-in"
                  />
                </div>
              )}

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full cursor-pointer transition-colors"
                    >
                      #{tag.name.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Interaction buttons */}
            <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50">
              <div className="flex items-center space-x-4">
                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors">
                  <MessageSquare size={18} />
                  <span className="text-sm">{post.comments_count || 0}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                  <Heart size={18} />
                  <span className="text-sm">{post.likes_count || 0}</span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <button className="text-gray-500 hover:text-blue-600 transition-colors">
                  <BookmarkPlus size={18} />
                </button>
                <button className="text-gray-500 hover:text-blue-600 transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostCard;