import { createContext, useState, useContext } from "react";

// Create a context for user information
// This context will provide user data and a function to update it
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log("UserProvider", user); // Log the user state for debugging

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
