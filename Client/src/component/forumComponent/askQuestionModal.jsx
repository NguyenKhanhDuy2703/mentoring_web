import { useState } from "react";
import { X, Image, Folder, Tag, Trash2 } from "lucide-react";

export default function AskQuestionModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("question");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [Tags , setTags] = useState([]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAskQuestion = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and content.");

      return;
    }
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Tags:", Tags);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white w-[500px] rounded-2xl shadow-lg p-6 border border-gray-200">
        {/* Header */}
        <div className="flex justify-end">
          <button className="text-gray-500 hover:text-gray-800 transition" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex mt-2 border-b border-gray-300">
          {["question", "post"].map((tab) => (
            <button
              key={tab}
              className={`w-1/2 py-2 text-center text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "question" ? "Ask Question" : "Create Post"}
            </button>
          ))}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <p className="text-gray-900 text-sm font-medium">Pete Lada</p>
          <select className="border-blue-600 px-3 py-1.5 text-sm rounded border focus:ring-2 focus:ring-blue-400 outline-none">
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>

        {/* Title Input */}
        <input
          type="text"
          className="w-full mt-4 p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content Input */}
        <textarea
          className="w-full mt-3 p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          rows="4"
          placeholder={activeTab === "question" ? 'Start your question with "What", "How", "Why", etc.' : "Say something..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        {/* Image Preview */}
        {selectedImage && (
          <div className="relative mt-3">
            <img src={selectedImage} alt="Uploaded" className="w-full h-auto rounded-lg object-contain max-h-64" />
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md text-gray-600 hover:text-red-600 transition"
              onClick={() => setSelectedImage(null)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        )}

        {/* Tags */}
        <div className="mt-3 flex items-center gap-2 text-gray-600">
          <Tag size={18} />
          <input
            type="text"
            placeholder="Add tags..."
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-full text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e)=>(setTags(e.target.value))}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center gap-3 mt-4">
          {activeTab === "post" && (
            <div className="flex flex-5 items-center gap-4 text-gray-600">
              <label className="flex items-center gap-1 text-sm hover:text-blue-600 transition cursor-pointer">
                <Image size={18} /> Add Image
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
              <button className="flex items-center gap-1 text-sm hover:text-blue-600 transition">
                <Folder size={18} /> Attach Folder
              </button>
            </div>
          )}
          <div className="flex flex-5 justify-end w-full">
            <button className="text-gray-500 text-sm hover:underline" onClick={onClose}>
              Cancel
            </button>
            <button
              className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md transition"
              onClick={handleAskQuestion}
            >
              {activeTab === "question" ? "Add Question" : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
