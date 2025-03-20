import { Bell, Calendar } from "lucide-react";
import { LuMessageCircleWarning } from "react-icons/lu";
import InputSearch from "../input_search";
import FilterButton from "../mainComponent/filterButton";
import ImageUser from "../../assets/images/user.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { inforUserContext } from "../../layouts/mainLayout";
import { logout } from "../../services/authServices";
import Cookies from "js-cookie";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inforUser = useContext(inforUserContext);
  const navigate = useNavigate();
  const Logout = async () => {
    const token = Cookies.get("token");
    if (token) {
      await logout();
    }
    setIsOpen(false);
    setTimeout(() => {
      navigate("/auth/login");
    }, 1000);
  };

  return (
    <nav className="flex items-center gap-x-4 ">
      <div className="flex flex-5 items-center gap-4">
        <InputSearch />
      </div>

      <div className="flex-2">
        <FilterButton />
      </div>

      <div className="flex flex-1 items-center gap-5">
        <div className="flex items-center gap-5">
          <Calendar className="text-gray-600 cursor-pointer" />
          <Bell className="text-gray-600 cursor-pointer" />
          <LuMessageCircleWarning className="text-gray-600 cursor-pointer text-2xl" />
        </div>
      </div>
      <div className=" flex flex-2 items-center justify-end relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 focus:outline-none"
        >
          <div className="text-right">
            <p className="text-sm font-semibold capitalize">
              {inforUser?.user?.full_name || "Guest"}
            </p>
            <p className="text-xs text-gray-500 capitalize ">
              {inforUser?.user?.role || ""}
            </p>
          </div>
          <img
            src={ImageUser}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border"
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-10 mt-2 w-48 bg-white border rounded-lg shadow-lg">
            <ul className="py-2 text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Thông tin cá nhân
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <button onClick={Logout}>Đăng xuất </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
