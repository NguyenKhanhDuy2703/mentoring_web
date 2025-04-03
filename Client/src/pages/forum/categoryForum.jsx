import { createContext, useEffect, useRef, useState } from "react";
import PostCard from "../../component/forumComponent/postCard.jsx";
import { getQuestionFollowTags } from "../../services/forumServices.js";
import { useLocation } from "react-router-dom";

export const QuestionContext2 = createContext();

const CategoryForum = () => {
  const [questions, setQuestions] = useState({ data: [], currentPage: 1, totalPages: 1 });
  const [selectedTag, setSelectedTag] = useState("All");
  const checkRender = useRef(false);

  const location = useLocation();
  
  // Cập nhật tag từ URL mỗi khi location.search thay đổi
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tagFromURL = queryParams.get("tag") || "All";  // Cập nhật lại tag từ URL
    setSelectedTag(tagFromURL);
    fetchQuestions(1, tagFromURL);  // Gọi lại API khi tag thay đổi
  }, [location.search]);  // Dependency array chỉ theo dõi thay đổi của `location.search`

  // Hàm lấy dữ liệu từ API
  const fetchQuestions = async (page = 1, tag = "All") => {
    try {
      const askResult = await getQuestionFollowTags(tag, page, 10);
      console.log("Kết quả từ API:", askResult.data);  // Log kết quả ngay sau khi nhận được từ API
      if (askResult.status === 200 && askResult.data) {
        setQuestions({
          data: askResult.data || [],
          currentPage: askResult.currentPage || 1,
          totalPages: askResult.totalPages || 1,
        });
      } else {
        console.error("API không trả về dữ liệu hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Lắng nghe sự thay đổi của `questions` và log giá trị sau khi cập nhật
  useEffect(() => {
    console.log("Dữ liệu `questions` sau khi thay đổi:", questions);  // Log khi `questions` thay đổi
  }, [questions]);

  // Hàm xử lý phân trang
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= questions.totalPages) {
      fetchQuestions(newPage, selectedTag);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-4">
      <QuestionContext2.Provider value={questions}>
        <PostCard questions={questions.data} /> {/* Truyền đúng data vào PostCard */}
      </QuestionContext2.Provider>

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

export default CategoryForum;
