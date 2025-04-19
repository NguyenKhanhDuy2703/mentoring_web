import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "../components/common/navBar";
import Sidebar from "../components/common/sideBar";
import { fetchUserbyToken } from "../features/auth/authSlise";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    dispatch(fetchUserbyToken());
  }, [dispatch]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-20 px-6 py-3 flex items-center justify-between ">
        <h2 className=" flex-2/12 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 text-transparent bg-clip-text">
          Mentoring
        </h2>
        <div className=" flex-10/12 justify-end">
          <Navbar userInfor={user} />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex pt-20">
        {/* Sidebar */}
        <div className="fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white shadow-lg rounded-r-xl z-10 transition-all duration-300 hover:shadow-xl">
          <div className="p-4">
            <Sidebar />
          </div>
        </div>
        
        {/* Main Page Content */}
        <div className="flex md:ml-65 transition-all duration-300 w-full">
          <div className=" flex-3/4  rounded-xl  p-6 ">
            <Outlet />
          </div>
          <div className="flex-1/4" >
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;