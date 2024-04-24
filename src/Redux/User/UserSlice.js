import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  logInUser,
  addLike,
  addToBookmark,
  getBookmark,
  getMyStories,
} from "./UserApi";

const initialState = {
  user: {},
  fetching: false,
  signinError: false,
  signupError: false,
  error: false,
  likes: [],
  bookmarks: [],
  myStories: [],
};

export const registerUserAsync = createAsyncThunk(
  "user/register",
  async (data) => {
    const response = await registerUser(data);
    return response.data;
  }
);

export const loginUserAsync = createAsyncThunk("user/login", async (data) => {
  const response = await logInUser(data);
  return response.data;
});

export const addLikeAsync = createAsyncThunk(
  "user/addLike",
  async (storyId) => {
    const response = await addLike(storyId);
    return response.data;
  }
);

export const addToBookmarkAsync = createAsyncThunk(
  "user/addToBookmark",
  async (storyId) => {
    const response = await addToBookmark(storyId);
    return response.data;
  }
);

export const getBookmarkAsync = createAsyncThunk(
  "user/getBookmark",
  async () => {
    const response = await getBookmark();
    return response.data;
  }
);

export const getMyStoriesAsync = createAsyncThunk(
  "user/getMyStories",
  async () => {
    const response = await getMyStories();
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = {};
      localStorage.removeItem("TOKEN");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state) => {
        state.signupError = false;
        state.fetching = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.signupError = false;
        const { token, user } = action.payload;
        state.fetching = false;
        state.user = user;
        localStorage.setItem("TOKEN", token);
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.fetching = false;
        state.signupError = true;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.signinError = false;
        state.fetching = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        state.signinError = false;
        state.fetching = false;
        state.user = user;
        localStorage.setItem("TOKEN", token);
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.fetching = false;
        state.signinError = true;
      })
      .addCase(addLikeAsync.fulfilled, (state, action) => {
        state.likes.push(action.payload);
      })
      .addCase(addToBookmarkAsync.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
      })
      .addCase(getBookmarkAsync.fulfilled, (state, action) => {
        state.bookmarks = action.payload;
      })
      .addCase(getMyStoriesAsync.fulfilled, (state, action) => {
        state.myStories = action.payload;
      });
  },
});

export const { logOutUser } = userSlice.actions;

export const signupError = (state) => state.user.signupError;
export const signinError = (state) => state.user.signinError;
export const user = (state) => state.user.user;
export const fetching = (state) => state.user.fetching;
export const likes = (state) => state.user.likes;
export const bookmarks = (state) => state.user.bookmarks;
export const myStories = (state) => state.user.myStories;

export default userSlice.reducer;
