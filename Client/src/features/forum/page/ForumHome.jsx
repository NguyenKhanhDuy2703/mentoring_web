import PostCard from "../components/postCard";
import { useDispatch , useSelector } from "react-redux";
import {fetchPosts} from"../forumSlice"
import { useEffect } from "react";
import Pagination from "../../../components/common/pagination";
const MainForum = () => {
   
    const dispatch = useDispatch();
    const {posts , currentPage , totalPages } = useSelector((state) => state.posts);
   useEffect ( () => {
    dispatch(fetchPosts())
   },[dispatch])

  return (
    <div className="w-full flex flex-col space-y-4">
      <PostCard   posts={posts} />

      {/* Các điều khiển phân trang */}
      <div className="flex justify-center space-x-4 mt-4">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};

export default MainForum;
