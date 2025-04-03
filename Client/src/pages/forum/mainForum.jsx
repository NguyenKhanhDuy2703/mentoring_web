import { createContext, useEffect, useRef, useState } from "react";
import PostCard from "../../component/forumComponent/postCard.jsx";
import { getAllQuestion } from "../../services/forumServices.js";
import socket from "../../services/socket.js";

export const QuestionContext = createContext();

const MainForum = () => {
  const [questions, setQuestions] = useState({ data: [], currentPage: 1, totalPages: 1 });
  const checkRender = useRef(false);

  // Gọi API với trang hiện tại
  const fetchQuestions = async (page = 1) => {
    try {
      const askResult = await getAllQuestion(page, 10); // Giới hạn 10 câu hỏi mỗi trang
      setQuestions({
        data: askResult.data || [],
        currentPage: askResult.currentPage || 1,
        totalPages: askResult.totalPages || 1,
      });
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    if (!checkRender.current) {
      checkRender.current = true;
      fetchQuestions(1); // Mặc định tải trang đầu tiên
    }
  }, []);

  useEffect(() => {
    socket.on("newQuestion", (data) => {
      console.log("Câu hỏi mới:", data);
      setQuestions((prev) => ({
        ...prev,
        data: [data, ...prev.data],
      }));
    });
    return () => {
      socket.off("newQuestion");
    };
  }, []);

  // Xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= questions.totalPages) {
      fetchQuestions(newPage);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      <QuestionContext.Provider value={questions}>
        <PostCard />
      </QuestionContext.Provider>
      
      {/* Các điều khiển phân trang */}
      <div className="flex justify-center space-x-4 mt-4">
        <button 
          onClick={() => handlePageChange(questions.currentPage - 1)}
          disabled={questions.currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        
        <span>Trang {questions.currentPage} của {questions.totalPages}</span>

        <button 
          onClick={() => handlePageChange(questions.currentPage + 1)}
          disabled={questions.currentPage === questions.totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainForum;
