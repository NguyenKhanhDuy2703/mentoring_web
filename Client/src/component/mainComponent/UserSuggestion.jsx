import React, { useContext } from "react";
import { listUserContext } from "../../layouts/mainLayout";
import AvatarDefault from "../../assets/images/avatar_macdinh.webp";

const UserSuggestions = () => {
  const users = useContext(listUserContext);

  if (!users || users.length === 0) {
    return <div className="text-center p-3 text-gray-500 text-sm">Không có gợi ý</div>;
  }

  return (
    <div className="max-w-xs mt-4 bg-white rounded-lg shadow-md p-3">
      <h2 className="text-sm font-semibold text-gray-700 mb-2">Gợi ý kết bạn</h2>
      {users.map((user, index) => (
        <div key={index} className="flex items-center gap-3 p-2 border-b last:border-none">
          <img src={AvatarDefault} alt={user.full_name} className="w-10 h-10 rounded-full" />
          <div className="flex-1">
            <h3 className="text-blue-600 text-sm font-medium">{user.full_name}</h3>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
          <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600">
            Kết bạn
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserSuggestions;
