import { Outlet } from "react-router-dom";
import AskBox from "../components/askBox";
import { MessageCircle, Users, TrendingUp } from "lucide-react";

const ForumLayout = () => {
  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      {/* Header Section with Background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-md mb-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col space-y-2 mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <MessageCircle size={24} />
              <h1 className="text-2xl font-bold">Diễn đàn</h1>
            </div>
            <p className="text-blue-100">
              Chào mừng bạn đến với diễn đàn của chúng tôi! Hãy đặt câu hỏi hoặc chia sẻ kiến thức.
            </p>
          </div>
        

        </div>
      </div>
      
    
      
      {/* Filter Navigation */}
      <div className="container mx-auto mb-6">
        <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-200">
          <div className="flex overflow-x-auto no-scrollbar">
            <button className="whitespace-nowrap px-4 py-2 mx-1 rounded-md bg-blue-100 text-blue-700 font-medium">Tất cả</button>
            <button className="whitespace-nowrap px-4 py-2 mx-1 rounded-md hover:bg-gray-100 text-gray-700">Câu hỏi phổ biến</button>
            <button className="whitespace-nowrap px-4 py-2 mx-1 rounded-md hover:bg-gray-100 text-gray-700">Chưa trả lời</button>
            <button className="whitespace-nowrap px-4 py-2 mx-1 rounded-md hover:bg-gray-100 text-gray-700">Đã trả lời</button>
            <button className="whitespace-nowrap px-4 py-2 mx-1 rounded-md hover:bg-gray-100 text-gray-700">Mới nhất</button>
            
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto flex-grow">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <Outlet />
        </div>
      </div>
      
      {/* Footer */}
      <div className="container mx-auto mt-8 mb-4 text-center text-sm text-gray-500">
        <p>Diễn đàn Mentoring © 2025</p>
      </div>
    </div>
  );
};

export default ForumLayout;