import { createContext, useEffect, useRef, useState } from "react";
import PostCard from "../../component/forumComponent/postCard.jsx";
import {getAllQuestion } from "../../services/forumServices.js";
import socket from "../../services/socket.js";

export const QuestionContext  = createContext();


const MainForum = () => {
  const [Questions , setQuestions] = useState({ data: [] });
  const checkRender = useRef(false);

  useEffect(() => {
    const callApi = async () => {
      try {
        const askResult = await getAllQuestion();
      

        setQuestions(askResult || { data: [] }); 
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
    socket.on("newQuestion", (data ) => {
      console.log("New question:", data);
        setQuestions((prev) => ({
          ...prev,
          data: [data, ...(prev.data || [])],
        }));    
    });
    return () => {
      socket.off("newQuestion");
    };
  }, []);

  return (
    <div className="w-full flex flex-col space-y-4">
  <QuestionContext.Provider value={Questions}>
    <PostCard />
  </QuestionContext.Provider>
    </div>
  );
};

export default MainForum;
