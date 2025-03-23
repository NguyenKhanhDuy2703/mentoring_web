import { createContext, useEffect, useRef, useState } from "react";
import AskCard from "../../component/forumComponent/askCard.jsx";
import PostCard from "../../component/forumComponent/postCard.jsx";
import { getAskQuestion, getPostQuestion } from "../../services/forumServices.js";
import socket from "../../services/socket.js";

export const AskQuestionContext = createContext();
export const PostContext = createContext();

const MainForum = () => {
  const [inforAsk, setInforAsk] = useState({ data: [] }); // ✅ Fix: Khởi tạo với data []
  const [inforPost, setInforPost] = useState({ data: [] });
  const checkRender = useRef(false);

  useEffect(() => {
    const callApi = async () => {
      try {
        const askResult = await getAskQuestion();
        const postResult = await getPostQuestion();

        setInforAsk(askResult || { data: [] }); // ✅ Đảm bảo không bị undefined
        setInforPost(postResult || { data: [] });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!checkRender.current) {
      checkRender.current = true;
      callApi();
    }
  }, []);

  useEffect(() => {
    socket.on("newQuestion", (data , user) => {
      console.log("New question:", data);
      if (data.type === "ask") {
        setInforAsk((prev) => ({
          ...prev,
          data: [data, ...(prev.data || [])],
        }));
      } else {
        setInforPost((prev) => ({
          ...prev,
          data: [data, ...(prev.data || [])],
        }));
      }
    });

    // ✅ Cleanup đúng cách
    return () => {
      socket.off("newQuestion");
    };
  }, []);

  return (
    <div className="w-full flex flex-col space-y-4">
      <AskQuestionContext.Provider value={inforAsk}>
        <AskCard />
      </AskQuestionContext.Provider>
      <PostContext.Provider value={inforPost}>
        <PostCard />
      </PostContext.Provider>
    </div>
  );
};

export default MainForum;
