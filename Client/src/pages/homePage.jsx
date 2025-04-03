
import  { useUser }  from "../contexts/UserContext"; "../contexts/UserContext"
const HomePage = () =>{
  const { user } = useUser(); // Use user context
    return(
        <div className="flex w-full  items-center p-4 border-b border-gray-300">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">👋</span>
          <div>
            <h1 className="text-xl font-bold capitalize">Welcome back, {user?.full_name || "Guest"}</h1>
            <p className="text-gray-500 text-sm">
              Find answers to your technical questions and help others answer theirs.
            </p>
          </div>
        </div>
      
      </div>
    )
}
export default HomePage;