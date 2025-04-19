import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect  } from "react";


import HinhLogin from "../assets/images/hinhLogin.jpg";
import {  AnimatePresence , motion  } from "framer-motion";
const AuthenLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
 
  useEffect(() => {
    if (location.pathname === "/auth") {
      navigate("/auth/login");
    }
  }, [navigate, location.pathname]);

  return (
    <div className="flex w-full h-screen bg-gray-800">
      {/* Hình nền bên trái */}
      <div
        className="text-white w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${HinhLogin})` }}
      />  

      {/* Nội dung bên phải */}
      <div className="flex flex-col w-1/2 items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname} // Tạo hiệu ứng dựa trên URL
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthenLayout;
