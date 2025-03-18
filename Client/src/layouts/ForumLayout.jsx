import { Outlet } from "react-router-dom";
import AskBox from "../component/forumComponent/askBox_forum";

const ForumLayout = () => {
  
  return (
    <div className="flex flex-col space-y-4">  
        <AskBox />
      <div className="flex flex-col space-y-4">
        <Outlet />
      </div>
    </div>
  );
};

export default ForumLayout;
