
import { useContext } from "react";
import {inforUserContext}  from "../layouts/mainLayout"
const HomePage = () =>{
 const inforUser = useContext(inforUserContext);

    return(
        <div className="flex w-full  items-center p-4 border-b border-gray-300">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">👋</span>
          <div>
            <h1 className="text-xl font-bold">Welcome back, {inforUser?.user?.full_name || "Guest"}</h1>
            <p className="text-gray-500 text-sm">
              Find answers to your technical questions and help others answer theirs.
            </p>
          </div>
        </div>
      
      </div>
    )
}
export default HomePage;