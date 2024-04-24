import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./User/UserSlice";
import StoryReducer from "./Story/StorySlice";

export const store = configureStore({
  reducer: {
    user: UserReducer,
    product: StoryReducer,
  },
});
