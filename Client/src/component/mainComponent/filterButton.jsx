import { useState, useEffect } from "react";
import { ChevronDown, Filter } from "lucide-react";
import { getAllTags } from "../../services/HomeServices";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Tất cả");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate(); // Hook dùng để điều hướng

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTags = await getAllTags();
        if (fetchedTags && fetchedTags.data) {
          setTags(fetchedTags.data);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelect = async (tag) => {
    setSelected(tag);
    setIsOpen(false);

    // Điều hướng và gán giá trị tag vào query params
    navigate(`/forum/category?tag=${tag}`);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded-lg shadow-lg"
      >
        <Filter className="w-5 h-5" />
        <span>{selected}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white text-black rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700 capitalize"
              onClick={() => handleSelect(tag.name)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
