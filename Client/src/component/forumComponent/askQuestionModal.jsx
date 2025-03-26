import { useContext, useState } from "react";
import { X, Image, Folder, Tag, Trash2, Loader2 } from "lucide-react";
import { inforUserContext } from "../../layouts/mainLayout";
import { createQuestion } from "../../services/forumServices.js";
import imageCompression from "browser-image-compression";
import socket from "../../services/socket.js"
export default function AskQuestionModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("ask");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [Tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const inforUser = useContext(inforUserContext);
  const [images, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

  // Xử lý hình ảnh
  const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.log("No file selected");
      return;
    }
    const file = e.target.files[0];
    const validFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!validFormats.includes(file.type)) {
      alert("Invalid file format! Please upload a JPEG, PNG, or WEBP image.");
      return;
    }
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      if (!compressedFile) {
        console.log("Image compression failed");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(compressedFile);
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Error while compressing image:", error);
    }
  };
  // handle add tags
  const hanldeAddTags = (e) => {
    if (e.key === "Enter" && inputTag.trim() !== "") {
      e.preventDefault();
      if (!Tags.includes(inputTag)) {
        // thêm tất cả tag trước đó và tag mơi vào
        setTags([...Tags, inputTag]);
      }
      setInputTag("");
    }
  };
  // handle remove tags
  const handleRemoveTags = (index) => {
    const newTags = [...Tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };
  const handleAskQuestion = async () => {
    if (!content.trim() || Tags.length === 0) {
      alert("Please enter a title and content.");
      return;
    }

    setIsLoading(true); // Bắt đầu loading
    const formData = new FormData();
    formData.append("user_id", inforUser?.user?.id);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(Tags)); // tự đông chuyển đổi array thành string và cách nhau bằng đấu ,
    formData.append("folder", "");
    formData.append("type", activeTab);
    console.log(formData.getAll);
    
    if (images) {
      formData.append("image", images);
    }
    try {
      const request = await createQuestion(formData);
      const dataObject = Object.fromEntries(formData.entries());
      socket.emit("send_question", dataObject);
      console.log(request);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white w-[500px] rounded-2xl shadow-lg p-6 border border-gray-200">
        {/* Header */}
        <div className="flex justify-end">
          <button
            className="text-gray-500 hover:text-gray-800 transition"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex mt-2 border-b border-gray-300">
          {["ask", "post"].map((tab) => (
            <button
              key={tab}
              className={`w-1/2 py-2 text-center text-sm font-semibold transition-all ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "ask" ? "Ask Question" : "Create Post"}
            </button>
          ))}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <p className="text-gray-900 text-sm font-medium capitalize">
            {inforUser?.user?.full_name}
          </p>

          <select className="border-blue-600 px-3 py-1.5 text-sm rounded border focus:ring-2 focus:ring-blue-400 outline-none">
            <option>Public</option>
            <option>Limition</option>
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
          placeholder="Start your question with 'What', 'How', 'Why', etc."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        {/* Image Preview */}
        {selectedImage && (
          <div className="relative mt-3">
            <img
              src={selectedImage}
              alt="Uploaded"
              className="w-full h-auto rounded-lg object-contain max-h-64"
            />
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
          <div className="border border-gray-300 rounded-lg px-3 py-2 flex flex-wrap items-center gap-2 text-sm w-full text-gray-900 focus-within:ring-2 focus-within:ring-blue-500 outline-none">
            {Tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
              >
                {tag}
                <button type="button" onClick={() => handleRemoveTags(tag)}>
                  <X size={14} className="text-gray-600 hover:text-red-600" />
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder="Add tags..."
              className="outline-none flex-1"
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onKeyDown={hanldeAddTags}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center gap-3 mt-4">
          {activeTab === "post" && (
            <label className="flex items-center gap-1 text-sm hover:text-blue-600 transition cursor-pointer">
              <Image size={18} /> Add Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
          <div className="flex flex-5 justify-end w-full">
            <button
              className="text-gray-500 text-sm hover:underline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="ml-3 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-md transition flex items-center gap-2"
              onClick={handleAskQuestion}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : null}
              {isLoading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
