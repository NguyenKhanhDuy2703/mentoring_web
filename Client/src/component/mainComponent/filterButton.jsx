
  import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";

const programmingLanguages = [
  "Tất cả",
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Swift",
  "TypeScript",
];

const FilterButton = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Tất cả");

  const handleSelect = (lang) => {
    setSelected(lang);
    setIsOpen(false);
    onSelect(lang);
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
        <div className="absolute mt-2 w-48 bg-gray-900 text-white rounded-lg shadow-lg">
          {programmingLanguages.map((lang) => (
            <button
              key={lang}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              onClick={() => handleSelect(lang)}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterButton;
