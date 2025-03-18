import { FaUsers } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

const MyForm = () => {
  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      {/* Tiêu đề */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Diễn đàn</h3>
        <button className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-gray-200 transition">
          <AiOutlinePlus size={20} />
        </button>
      </div>

      {/* Danh sách có thể cuộn nhưng ẩn thanh cuộn */}
      <div className="max-h-40 overflow-y-auto hide-scrollbar">
        <ul className="space-y-1 text-gray-600">
          {[
            "OOP Java", "Community Data Engineer", "Community Python", "Community C#",
            "AI Research", "Cybersecurity", "Cloud Computing", "Data Science",
            "Machine Learning", "DevOps", "Blockchain", "Game Development"
          ].map((forum, index) => (
            <li key={index} className="flex items-center gap-2 p-2 text-sm hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition">
              <FaUsers size={16} /> {forum}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyForm;
