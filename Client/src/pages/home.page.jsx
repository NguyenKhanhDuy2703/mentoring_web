import {useSelector} from "react-redux"
const HomePage = () =>{
    const {user} = useSelector((state) => state.auth)
    return(
        <div className="flex w-full  items-center p-4 border-b border-gray-300">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">👋</span>
          <div>
            <h1 className="text-xl font-bold capitalize">Chào mừng , {user?.full_name || "Guest"}</h1>
            <p className="text-gray-500 text-sm">
            Tìm câu trả lời cho các câu hỏi kỹ thuật của bạn và giúp người khác trả lời câu hỏi của họ.
            </p>
          </div>
        </div>

      </div>
    )
}
export default HomePage;