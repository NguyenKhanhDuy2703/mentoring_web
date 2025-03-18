import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import imgaUser from "../../assets/images/user.jpg";
import AskQuestionModal from "./askQuestionModal";

export default function AskBox() {
  const [input, setInput] = useState("");
  const [isOpenAsk, setIsOpenAsk] = useState(false);

  return (
    <div className="bg-white text-gray-900 p-4 rounded-xl w-full shadow-md border border-gray-300">
      {/* Input */}
      <div className="flex items-center space-x-4">
        <img src={imgaUser} alt="Avatar" className="w-12 h-12 rounded-full" />
        <input
          type="text"
          placeholder="Bạn muốn hỏi hoặc chia sẻ điều gì?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-white border border-gray-300 text-gray-900 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
        />
      </div>

      {/* Nút chức năng */}
      <div className="flex justify-center items-center mt-4 text-gray-700">
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
