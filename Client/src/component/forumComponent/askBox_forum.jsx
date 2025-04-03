import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import AskQuestionModal from "./askQuestionModal";

export default function AskBox() {
  // const [input, setInput] = useState("");
  const [isOpenAsk, setIsOpenAsk] = useState(false);
  return (
    <div className=" flex items-center justify-center bg-white text-gray-900 p-4 rounded-xl w-full shadow-md border border-gray-300">
     
      

      {/* Nút chức năng */}
      <div className="flex flex-8 justify-center items-center  text-gray-700">
        {/* Nút đặt câu hỏi */}
        <button
          className="flex flex-1 justify-center items-center space-x-2 px-4 py-2 rounded-lg transition-all text-blue-600 border border-blue-600 hover:bg-blue-50 hover:text-blue-700"
          onClick={() => setIsOpenAsk(!isOpenAsk)}
        >
          <MessageSquare size={18} />
          <span>Đặt câu hỏi</span>
        </button>

        {/* Thanh phân cách */}
        <div className="h-5 w-px bg-gray-300 mx-2"></div>

        {/* Nút đăng bài */}
        <button className="flex flex-1 justify-center items-center space-x-2 px-4 py-2 rounded-lg transition-all text-blue-600 border border-blue-600 hover:bg-blue-50 hover:text-blue-700"
        onClick={() => setIsOpenAsk(!isOpenAsk)}
        >
          <Send size={18} />
          <span>Đăng bài</span>
        </button>
      </div>

      {/* Modal đặt câu hỏi */}
      {isOpenAsk && <AskQuestionModal onClose={() => setIsOpenAsk(false)} />}
    </div>
  );
}
