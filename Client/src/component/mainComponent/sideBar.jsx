import { Home, Folder } from "lucide-react";
import { MdForum } from "react-icons/md";
import { RiRoadMapLine } from "react-icons/ri";
import { HiLibrary } from "react-icons/hi";
import MyForm from "./myForum";
import MyProject from "./myProject";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="bg-white w-64 min-h-screen p-4 flex flex-col text-gray-900 shadow-md border-r border-gray-200">
      {/* Menu Items */}
      <nav className="flex-1">
        <ul className="space-y-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition">
            <Home size={20} /> <span>Trang chủ</span>
          </Link>
          <Link to="/forum" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition">
            <MdForum size={20} /> <span>Diễn đàn</span>
          </Link>
          <Link to="/managerproject" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition">
            <Folder size={20} /> <span>Quản lý dự án</span>
          </Link>
          <Link to="/roadmap" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition">
            <RiRoadMapLine size={20} /> <span>RoadMap</span>
          </Link>
          <Link to="/library" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-600 rounded-md transition">
            <HiLibrary size={20} /> <span>Thư viện</span>
          </Link>
        </ul>
      </nav>

      {/* Diễn đàn & Dự án */}
      <div className="mt-4  border-gray-200 pt-3">
        <MyForm />
        <MyProject />
      </div>
    </aside>
  );
};

export default Sidebar;
