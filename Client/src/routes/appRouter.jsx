import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import  ForumLayout from '../layouts/ForumLayout'
import MainForum from "../pages/forum/mainForum"
import CategoryForum from "../pages/forum/categoryForum"
import AuthenLayout from "../layouts/authenLayout";
import Login from "../component/auth/login";
import Register from "../component/auth/register";
import HomePage from "../pages/homePage";

const AppRouter = () => {
  return (
    <Routes>
       <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forum" element={<ForumLayout />}>
             <Route index element={<MainForum />} />
            <Route path=":category" element={<CategoryForum />} />
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
