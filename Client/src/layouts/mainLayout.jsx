import { Outlet } from "react-router-dom";
import Navbar from "../component/mainComponent/navBar";
import Sidebar from "../component/mainComponent/sideBar";
import { createContext, useEffect, useState, useMemo } from "react";
import UserSuggestion from "../component/mainComponent/UserSuggestion";
import { getAllUser, homeApi ,getAllTag } from "../services/HomeServices";


export const inforUserContext = createContext();
export const listUserContext = createContext();
export const listAllTagContext = createContext();
const MainLayout = () => {
  const [inforUser, setInforUser] = useState(null);
  const [listUsers, setListUser] = useState([]);
  const[listAllTags, setListAllTags]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data, listUser, tags] = await Promise.all([homeApi(), getAllUser(),getAllTag()]);
        setInforUser(data);
        setListUser(listUser);
        setListAllTags(tags);

      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchData();
  }, []);

  // Tạo giá trị memo để tránh render lại không cần thiết
  const memoizedInforUser = useMemo(() => inforUser, [inforUser]);
  const memoizedListUsers = useMemo(() => listUsers, [listUsers]);
  const memoizedListTags = useMemo(() => listAllTags, [listAllTags]);
  if (!inforUser || listUsers.length === 0) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <inforUserContext.Provider value={memoizedInforUser }> 
        <listAllTagContext.Provider value={memoizedListTags}>
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10 p-4 flex items-center">
          <h2 className="flex-2 text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text ml-4">
            Mentoring
          </h2>
          <div className="flex-8">
            <Navbar  />
          </div>
        </div>
        </listAllTagContext.Provider>

        {/* Main Content */}
        <div className="flex pt-20">
          {/* Sidebar */}
          <div className="fixed top-20 left-4 h-[92vh] w-64 bg-white shadow-lg rounded-xl z-10 overflow-hidden">
            <Sidebar />
          </div>

          {/* Main Page Content */}
          <div className="flex-5 p-6 md:ml-72 transition-all duration-300">
            <Outlet />
          </div>

          {/* User Suggestion */}
          <listUserContext.Provider value={memoizedListUsers}>
            <div className="flex-2">
              <UserSuggestion />
            </div>
          </listUserContext.Provider>
        </div>
      </inforUserContext.Provider>
    </div>
  );
};

export default MainLayout;
