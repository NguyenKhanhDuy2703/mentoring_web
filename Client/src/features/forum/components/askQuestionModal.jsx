import {  useState } from "react";
import { X, Image, Tag, Trash2, Loader2, Upload, Send } from "lucide-react";
import imageCompression from "browser-image-compression";
import { useSelector , useDispatch } from "react-redux";
import {createQuestion} from "../../../services/forumServices"
import { addPost } from "../forumSlice";
export default function AskQuestionModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("ask");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [inputTag, setInputTag] = useState("");
  const [images, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth);
  // Handle image upload with compression
  const handleImageUpload = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
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
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  // Add tags
  const handleAddTags = (e) => {
    if ((e.key === "Enter" || e.key === " " || e.key === ",") && inputTag.trim() !== "") {
      e.preventDefault();
      const newTag = inputTag.trim().toLowerCase();
      
      if (!tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
      }
      setInputTag("");
    }
  };

  // Remove tags
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Submit question/post
  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
    
    if (!content.trim()) {
      alert("Please enter some content.");
      return;
    }
    
    if (tags.length === 0) {
      alert("Please add at least one tag.");
      return;
    }

    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("user_id", user?.id);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags));
    formData.append("folder", "");
    formData.append("type", activeTab);
        
    if (images) {
      formData.append("image", images);
    }
    console.log(formData)
    try {
        const response = await createQuestion(formData);
        console.log("Post created successfully:", response);
        dispatch(addPost( response.data));
        setIsLoading(false);
        onClose(); 
    } catch (error) {
        console.error("Error creating question/post:", error);
        alert("An error occurred while creating the post. Please try again.");
    }

 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 border border-gray-200">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab === "ask" ? "Ask a Question" : "Create a Post"}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-800 transition p-1 hover:bg-gray-100 rounded-full"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
          {[
            { id: "ask", label: "Ask Question" },
            { id: "post", label: "Create Post" }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`w-1/2 py-2 text-center text-sm font-medium transition-all rounded-md ${
                activeTab === tab.id
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
  
        {/* Title Input */}
        <div className="mb-3">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder={activeTab === "ask" ? "What's your question?" : "Enter post title..."}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
          <div className="flex justify-end mt-1">
            <span className="text-xs text-gray-500">{title.length}/100</span>
          </div>
        </div>

        {/* Content Input */}
        <div className="mb-3">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
            rows="4"
            placeholder={activeTab === "ask" 
              ? "Provide details about your question..." 
              : "What would you like to share?"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* Image Preview */}
        { activeTab == "post" && selectedImage && (
          <div className="relative mb-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
            <img
              src={selectedImage}
              alt="Uploaded"
              className="w-full h-auto rounded-lg object-contain max-h-32"
            />
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md text-gray-600 hover:text-red-600 transition"
              onClick={() => {
                setSelectedImage(null);
                setImage(null);
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        {/* Tags */}
        <div className="mb-4">
          <label className="text-sm text-gray-700 font-medium block mb-1">
            <Tag size={16} className="inline mr-1" /> Tags <span className="text-gray-500 font-normal">(up to 5)</span>
          </label>
          <div className="border border-gray-300 rounded-lg px-3 py-2 flex flex-wrap items-center gap-2 text-sm w-full text-gray-900 focus-within:ring-2 focus-within:ring-blue-500">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1 border border-blue-100"
              >
                #{tag}
                <button type="button" onClick={() => handleRemoveTag(tag)}>
                  <X size={14} className="text-blue-700 hover:text-red-600" />
                </button>
              </span>
            ))}
            <input
              type="text"
              placeholder={tags.length >= 5 ? "Tag limit reached" : "Add tags... (press Enter or space)"}
              className="outline-none flex-1 min-w-[100px]"
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onKeyDown={handleAddTags}
              disabled={tags.length >= 5}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center gap-3 mt-6 border-t border-gray-200 pt-3">
        { 
            activeTab === "post" ? (
                <div className="flex items-center">
                {/* Image upload button */}
                <label className={`flex items-center gap-1 text-sm px-3 py-2 rounded-md transition cursor-pointer ${
                  selectedImage ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-700 hover:bg-gray-100'
                }`}>
                  {selectedImage ? (
                    <>
                      <Image size={18} /> Changed
                    </>
                  ) : (
                    <>
                      <Upload size={18} /> Add Image
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isLoading}
                  />
                </label>
              </div>
            ) : ( <div> </div> )
        }
          
          <div className="flex items-center gap-2">
            <button
              className="text-gray-600 text-sm px-4 py-2 hover:bg-gray-100 rounded-md transition"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : "shadow-md hover:shadow-lg"
              }`}
              onClick={handleSubmit}
              disabled={isLoading || !title.trim() || !content.trim() || tags.length === 0}
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {isLoading ? "Posting..." : activeTab === "ask" ? "Post Question" : "Share Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}