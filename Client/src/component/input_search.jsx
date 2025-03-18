   import { CiSearch } from "react-icons/ci";

const InputSearch = () =>{
    return (
      <div className="relative w-full  ">
      <input
        type="text"
        placeholder="Search ..."
        className="w-full pl-5 pr-12 py-3 rounded-full bg-white border border-gray-300 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   transition-all duration-300 ease-in-out hover:shadow-md"
      />
      <CiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[24px] cursor-pointer hover:text-gray-600 transition-all" />
    </div>
    )
};
export default InputSearch;
