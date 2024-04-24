import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createStory,
  updateStory,
  addLikeToStory,
  getStoryById,
  getAllStoriesByCategory,
  getMyStories,
  addStoryToBookmarks,
  getBookmarkedStories,
} from "./StoryApi";

const initialState = {
  stories: [],
  myStories: [],
  fetching: false,
  error: "",
};

export const createStoryAsync = createAsyncThunk(
  "story/create",
  async (storyData) => {
    const response = await createStory(storyData);
    return response.data;
  }
);

export const updateStoryAsync = createAsyncThunk(
  "story/update",
  async ({ id, storyData }) => {
    const response = await updateStory(id, storyData);
    return response.data;
  }
);

export const addLikeToStoryAsync = createAsyncThunk(
  "story/addLike",
  async (id) => {
    const response = await addLikeToStory(id);
    return response.data;
  }
);

export const getStoryByIdAsync = createAsyncThunk(
  "story/getById",
  async (id) => {
    const response = await getStoryById(id);
    return response.data;
  }
);

export const getAllStoriesByCategoryAsync = createAsyncThunk(
  "story/getByCategory",
  async () => {
    const response = await getAllStoriesByCategory();
    return response.data;
  }
);

export const getMyStoriesAsync = createAsyncThunk(
  "story/getMyStories",
  async () => {
    const response = await getMyStories();
    return response.data;
  }
);

export const addStoryToBookmarksAsync = createAsyncThunk(
  "story/addToBookmarks",
  async (id) => {
    const response = await addStoryToBookmarks(id);
    return response.data;
  }
);

export const getBookmarkedStoriesAsync = createAsyncThunk(
  "story/getBookmarked",
  async () => {
    const response = await getBookmarkedStories();
    return response.data;
  }
);

const storySlice = createSlice({
  name: "story",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createStoryAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(createStoryAsync.fulfilled, (state, action) => {
        state.fetching = false;
        state.stories.push(action.payload);
      })
      .addCase(createStoryAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.error.message;
      })
      .addCase(updateStoryAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(updateStoryAsync.fulfilled, (state, action) => {
        state.fetching = false;
        const index = state.stories.findIndex((story) => story.id === action.payload.id);
        if (index !== -1) {
          state.stories[index] = action.payload;
        }
      })
      .addCase(updateStoryAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.error.message;
      })
      .addCase(addLikeToStoryAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(addLikeToStoryAsync.fulfilled, (state, action) => {
        state.fetching = false;
        // Update the like count for the story in state
        const index = state.stories.findIndex((story) => story.id === action.payload.id);
        if (index !== -1) {
          state.stories[index] = action.payload;
        }
      })
      .addCase(addLikeToStoryAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.error.message;
      })
      .addCase(getAllStoriesByCategoryAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getAllStoriesByCategoryAsync.fulfilled, (state, action) => {
        state.fetching = false;
        state.stories = action.payload;
      })
      .addCase(getAllStoriesByCategoryAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.error.message;
      })
      .addCase(getMyStoriesAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getMyStoriesAsync.fulfilled, (state, action) => {
        state.fetching = false;
        state.myStories = action.payload;
      })
      .addCase(getMyStoriesAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.error.message;
      })
      .addCase(addStoryToBookmarksAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(addStoryToBookmarksAsync.fulfilled, (state, action) => {
        state.fetching = false;
        // Update the bookmarked stories list in state
        state.myStories.push(action.payload);
      })
      .addCase(addStoryToBookmarksAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.error.message;
      })
      .addCase(getBookmarkedStoriesAsync.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getBookmarkedStoriesAsync.fulfilled, (state, action) => {
        state.fetching = false;
        state.myStories = action.payload;
      })
      .addCase(getBookmarkedStoriesAsync.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.error.message;
      });
  },
});

export const {
  clearError,
} = storySlice.actions;

export const selectStories = (state) => state.story.stories;
export const selectMyStories = (state) => state.story.myStories;
export const selectFetching = (state) => state.story.fetching;
export const selectError = (state) => state.story.error;

export default storySlice.reducer;
