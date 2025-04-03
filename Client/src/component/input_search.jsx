import { CiSearch } from "react-icons/ci";
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { searchEverything } from "../services/searchServices";

const InputSearch = () => {
  const [query, setQuery] = useState("");  // Lưu trữ giá trị tìm kiếm
  const [results, setResults] = useState([]);  // Lưu trữ kết quả tìm kiếm
  const [isLoading, setIsLoading] = useState(false);  // Lưu trữ trạng thái loading

  // Hàm xử lý tìm kiếm khi người dùng nhập
  const handleSearch = async () => {
    if (!query.trim()) return;  // Nếu query trống, không làm gì
    setIsLoading(true);  // Đặt trạng thái loading khi bắt đầu tìm kiếm
    try {
      const data = await searchEverything(query);  // Gọi API tìm kiếm
      setResults(data);  // Cập nhật kết quả tìm kiếm
    } catch (error) {
      console.error("Search error:", error);  // Xử lý lỗi nếu có
    } finally {
      setIsLoading(false);  // Đặt lại trạng thái loading
    }
  };

  // Hàm debounce để trì hoãn việc gọi handleSearch
  const debouncedSearch = useCallback(debounce(handleSearch, 500), [query]);

  // Hàm xử lý thay đổi ô nhập liệu
  const handleInputChange = (e) => {
    setQuery(e.target.value);  // Cập nhật giá trị query
    debouncedSearch();  // Gọi hàm debouncedSearch để trì hoãn tìm kiếm
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search ..."
        value={query}
        onChange={handleInputChange}  // Sử dụng handleInputChange để xử lý nhập liệu
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}  // Tìm kiếm khi nhấn Enter
        className="w-full pl-5 pr-12 py-3 rounded-full bg-white border border-gray-300 shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                   transition-all duration-300 ease-in-out hover:shadow-md"
      />
      <CiSearch
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[24px] cursor-pointer hover:text-gray-600 transition-all"
        onClick={handleSearch}  // Gọi hàm tìm kiếm khi nhấp vào biểu tượng tìm kiếm
      />
      {isLoading && <p className="absolute mt-2 text-sm text-gray-500">Loading...</p>}
      {results.length !== 0 && !isLoading && (
        <p className="absolute mt-2 text-sm text-gray-500">No results found</p>  // Thông báo không có kết quả
      )}
      {results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
          {results.map((result, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-all duration-200"
            >
              <p className="font-medium text-gray-800">{result.full_name}</p>
              <p className="text-sm text-gray-500">{result.role}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputSearch;
