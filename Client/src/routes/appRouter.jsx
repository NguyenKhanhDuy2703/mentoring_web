import { Route, Routes } from "react-router-dom";
// authentication import 
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import AuthenLayout from "../layouts/auth.layout";
// import main layout
import MainLayout from "../layouts/main.layout";
// import Fourm layout
import ForumLayout from "../features/forum/layouts/forum.layout";
// import forums

import MainForum from "../features/forum/page/ForumHome";
import HomePage from "../pages/home.page";

const AppRouter = () => {
  return (
    <Routes>
       <Route path="/" element={<MainLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="/forum" element={<ForumLayout />} >
              <Route index element={<MainForum />} />
          </Route>
 
       </Route>
       <Route path="/auth" element={<AuthenLayout />}>
         <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
       </Route>
   
    </Routes>
  );
};
export default AppRouter;
