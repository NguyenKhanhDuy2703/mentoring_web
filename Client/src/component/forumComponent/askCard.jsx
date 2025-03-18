import { useState } from "react";
import { Bookmark , X } from "lucide-react";

export default function AskCard() {
  const [following, setFollowing] = useState(false);

  return (
    <div className="w-full bg-white text-black p-4 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-2">                                          
        <p className="text-sm text-red-500 font-semibold">Questions for you</p>
        <button className="text-gray-500 hover:text-black">
          <X size={20} />      
        </button>
      </div>

      {/* Question */}
      <h2 className="mt-2 text-lg font-semibold">
        What causes certain scientists to reject religion?
      </h2>
      <p className="text-sm text-gray-500 mt-1">144 answers • Last followed Tue</p>

      {/* Actions */}
      <div className="mt-3 flex items-center gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md text-sm font-medium text-white">
          Answer
        </button>
        <button
          className={`flex items-center gap-1 border px-4 py-1.5 rounded-md text-sm font-medium ${
            following ? "border-blue-500 text-blue-500" : "border-gray-500 text-gray-500"
          }`}
          onClick={() => setFollowing(!following)}
        >
          <Bookmark size={16} />
          {following ? "Following" : "Follow"}
        </button>
        <button className="text-gray-500 border px-4 py-1.5 rounded-md hover:text-black text-sm">Pass</button>
      </div>
    </div>
  );
}
