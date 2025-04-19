import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlise";
import forumSlice from "../features/forum/forumSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: forumSlice,
  },
});
