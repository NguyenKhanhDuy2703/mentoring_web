import { useState } from "react";
import { MessageSquare } from "lucide-react";
import AskQuestionModal from "./AskQuestionModal";

export default function AskBox() {
  const [isOpenAsk, setIsOpenAsk] = useState(false);

  return (
    <div className="flex items-center justify-center text-gray-900 rounded-xl ">
      <button
        className="flex items-center space-x-2 px-5 py-2 rounded-lg transition-all text-blue-600 border border-blue-600 hover:bg-blue-50 hover:text-blue-700"
        onClick={() => setIsOpenAsk(true)}
      >
        <MessageSquare size={18} />
        <span>Đặt câu hỏi </span>
      </button>

      {/* Modal */}
      {isOpenAsk && <AskQuestionModal onClose={() => setIsOpenAsk(false)} />}
    </div>
  );
}
