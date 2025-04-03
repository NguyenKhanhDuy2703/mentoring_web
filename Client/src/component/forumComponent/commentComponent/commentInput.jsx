import AvatarDefault from "../../../assets/images/avatar_macdinh.webp";

const CommentInput = ({ value, onChange, onSubmit, placeholder }) => {
  return (
    <div className="mt-4 flex gap-3 items-center">
      <img src={AvatarDefault} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
        placeholder={placeholder}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Viết bình luận"
      />

      <button
        onClick={onSubmit}
        disabled={!value.trim()}
        className={`px-4 py-1 rounded-lg transition ${
          value.trim()
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Gửi
      </button>
    </div>
  );
};

export default CommentInput;
