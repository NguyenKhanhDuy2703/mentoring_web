import { Home, Folder } from "lucide-react";
import { MdForum } from "react-icons/md";
import { RiRoadMapLine } from "react-icons/ri";
import { HiLibrary } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: "/home", icon: <Home size={20} />, label: "Trang chủ" },
    { path: "/forum", icon: <MdForum size={20} />, label: "Diễn đàn" },
    { path: "/managerproject", icon: <Folder size={20} />, label: "Quản lý dự án" },
    { path: "/roadmap", icon: <RiRoadMapLine size={20} />, label: "RoadMap" },
    { path: "/library", icon: <HiLibrary size={20} />, label: "Thư viện" },
  ];

  return (
    <aside className="bg-white w-full h-full flex flex-col text-gray-900 rounded-lg">
      {/* Menu Items */}
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <span className={`${isActive ? "text-blue-600" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-blue-600"></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Footer section if needed */}
      <div className="p-4 mt-auto border-t border-gray-100">
        <div className="text-xs text-gray-500 text-center">
          Mentoring Platform v1.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;