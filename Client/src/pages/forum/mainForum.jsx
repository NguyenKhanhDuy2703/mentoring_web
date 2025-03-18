import AskCard from "../../component/forumComponent/askCard.jsx"
import PostCard from "../../component/forumComponent/postCard.jsx";
import ProjectIdeaPost from "../../component/forumComponent/projectIdeaPost.jsx";
const MainForum = () => {
    return (
        <div className="w-full flex flex-col space-y-4">
             <AskCard />
             <PostCard />
             <ProjectIdeaPost />
        </div>
    );
    }
export default MainForum;