
import { useContext, useState } from "react";
import { Bookmark, X } from "lucide-react";
import { AskQuestionContext } from "../../pages/forum/mainForum.jsx";

export default function AskCard() {
  const [following, setFollowing] = useState(false);
  const inforAsk = useContext(AskQuestionContext);

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {inforAsk?.data?.map((item) => (
        <div key={item.id} className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <p className="text-sm text-red-500 font-semibold">Questions for you</p>
            <button className="text-gray-500 hover:text-black">
              <X size={20} />
            </button>
          </div>

          {/* User Info */}
          <p className="text-sm text-gray-500 flex items-center gap-2 pt-2">
            <span className="font-semibold text-gray-700 capitalize">
              {item.user?.full_name}
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold text-white bg-blue-500 rounded-md">
              {item.user?.role || "No role"}
            </span>
          </p>

          {/* Question Title */}
          <h2 className="mt-2 text-lg font-medium text-gray-600">
            {item.title}
          </h2>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-2">
            {item.tag?.split(",").map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-200 rounded-md"
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          {/* Question Content */}
          <h2 className="mt-2 text-lg text-black">
            <strong>{item.body || "No content available"}</strong>
          </h2>
          <p className="text-sm text-gray-500 mt-1">144 answers • Last followed Tue</p>

          {/* Actions */}
          <div className="mt-3 flex items-center gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-md text-sm font-medium text-white">
              Answer
            </button>
            <button
              className={`flex items-center gap-1 border px-4 py-1.5 rounded-md text-sm font-medium ${
                following
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-500 text-gray-500"
              }`}
              onClick={() => setFollowing(!following)}
            >
              <Bookmark size={16} />
              {following ? "Following" : "Follow"}
            </button>
            <button className="text-gray-500 border px-4 py-1.5 rounded-md hover:text-black text-sm">
              Pass
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
