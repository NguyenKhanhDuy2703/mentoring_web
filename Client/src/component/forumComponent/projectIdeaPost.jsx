import { UserPlus, MessageCircle, Heart, X } from "lucide-react";
import ProjectImg from "../../assets/images/project-idea.jpg";

const ProjectIdeaPost = () => {
  return (
    <div className="bg-white text-black p-5 rounded-lg shadow-lg space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">
              Kurt Guntheroth <span className="text-blue-500 cursor-pointer">• Follow</span>
            </p>
            <p className="text-sm text-gray-600">
              Software Engineer for 40 years, author of book Optimized C++ • Feb 18
            </p>
          </div>
        </div>
        <button className="text-gray-600 hover:text-black">
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div>
        <h2 className="text-lg font-bold">🚀 Ý tưởng dự án: Nền tảng chia sẻ công thức nấu ăn</h2>
        <p className="text-sm text-gray-700">
          Tôi đang phát triển một nền tảng giúp mọi người chia sẻ và khám phá các công thức nấu ăn từ nhiều nền văn hóa khác nhau.
          Ứng dụng sẽ có tính năng đăng bài, bình luận và tìm kiếm công thức theo nguyên liệu.  
          Bạn có muốn tham gia cùng phát triển không? 🌟
        </p>
      </div>

      {/* Image */}
      <img
        src={ProjectImg}
        alt="Project related to cooking platform"
        className="w-full rounded-lg"
      />

      {/* Actions */}
      <div className="flex justify-between items-center mt-3 text-gray-600">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 hover:text-red-400">
            <Heart className="w-5 h-5" />
            <span>63</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <MessageCircle className="w-5 h-5" />
            <span>7</span>
          </button>
        </div>
        <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-lg">
          <UserPlus className="w-5 h-5" />
          <span>Gửi yêu cầu tham gia</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectIdeaPost;
