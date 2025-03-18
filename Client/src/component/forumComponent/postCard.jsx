import { ThumbsUp, MessageSquare, Repeat, X } from "lucide-react";

export default function PostCard() {
  return (
    <div className="w-full bg-white text-black p-4 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">
              Kurt Guntheroth <span className="text-blue-500 cursor-pointer">• Follow</span>
            </p>
            <p className="text-sm text-gray-600">
              Software Engineer for 40 years, author of book Optimized C++ • Feb 18
            </p>
          </div>
        </div>
        <button className="text-gray-600 hover:text-black">
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <h2 className="mt-3 text-lg font-semibold">Why is programming so easy?</h2>
      <p className="text-sm text-gray-700 mt-1">
        1. Programming a 20-line function is easy. 2. Programming a class with a dozen
        20-line functions that interacts with instances of 200 other classes is...
        easy, to the extent that any task that takes a year of full-time work can ever be
        considered easy....
        <span className="text-blue-500 cursor-pointer"> (more)</span>
      </p>

      {/* Actions */}
      <div className="mt-3 flex items-center gap-4 text-gray-600">
        <button className="flex items-center gap-1 hover:text-black">
          <ThumbsUp size={16} /> 491
        </button>
        <button className="flex items-center gap-1 hover:text-black">
          <MessageSquare size={16} /> 24
        </button>
        <button className="flex items-center gap-1 hover:text-black">
          <Repeat size={16} /> 6
        </button>
      </div>
    </div>
  );
}
