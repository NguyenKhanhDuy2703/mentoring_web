import { Outlet } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
const ManagerProjectLayout = () => {
  return (
    <div className="w-full p-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-black mb-6 transition-all duration-500 hover:text-blue-600">
        MY PROJECTS
      </h1>
      
      {/* Filter & Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:bg-gray-200">
            Filter <IoIosArrowDown />
          </button>
          <button className="border px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:bg-gray-200">
            Today <IoIosArrowDown />
          </button>
        </div>
      </div>
      
      {/* Project List */}
      <div className="  animate-fade-in-up border-t-2 border-gray-200 py-6">
        <Outlet />
        
      </div>
    </div>
  );
};

export default ManagerProjectLayout;
