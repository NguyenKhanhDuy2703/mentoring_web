import { FaUsers } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

const MyProject = () => {
  return (
    <div className="border-t border-gray-200 pt-4 mt-4">
      {/* Tiêu đề */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Dự án đã tham gia</h3>
        <button className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-gray-200 transition">
          <AiOutlinePlus size={20} />
        </button>
      </div>

      {/* Danh sách dự án */}
      <ul className="space-y-1 text-gray-600">
        {["OOP Java", "Community Data Engineer", "Community Python", "Community C#"].map((project, index) => (
          <li key={index} className="flex items-center gap-2 p-2 text-sm hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition">
            <FaUsers size={16} /> {project}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyProject;
