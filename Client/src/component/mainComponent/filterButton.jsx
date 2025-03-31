import { useContext, useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import { listAllTagContext } from "../../layouts/mainLayout"
const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Tất cả");
  const listTags= useContext(listAllTagContext); 
  console.log(listTags.tags)
  const handleSelect = (tag) => {
    // gắn tag đã đc chọn vào ô màu xanh 
    setSelected(tag);
    setIsOpen(false);
    console.log(tag);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Nút mở dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded-lg shadow-lg"
      >
        <Filter className="w-5 h-5" />
        <span>{selected}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown danh sách tags */}
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg z-10">
          {listTags.tags.length > 0 ? (
          listTags.tags.map((tag, index) => (
              <button
                key={index}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                onClick={() => handleSelect(tag.name)}
              >
                {tag.name}
              </button>
            ))
          ) : (
            <p className="px-4 py-2 text-gray-400">Không có tags </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
