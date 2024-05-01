import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const createStory = async (storyData) => {
  try {
    
    const reqUrl = `${backendUrl}/story/v1/createStory`;
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    const response = await axios.post(reqUrl, storyData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateStory = async (storyId, storyData) => {
  try {
    const reqUrl = `${backendUrl}/story/v1/updateStory/${storyId}`;
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    const response = await axios.put(reqUrl, storyData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addLikeToStory = async (storyId) => {
  try {
    const reqUrl = `${backendUrl}/story/v1/addLikeToStory/${storyId}`;
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    const response = await axios.put(reqUrl);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getMyStories = async () => {
  try {
    const reqUrl = `${backendUrl}/story/v1/getMyStories`;
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getAllStoriesByCategory = async (category) => {
  try {
    const reqUrl = `${backendUrl}/story/v1/getStoryByCat?category=${category}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getStoryById = async (storyId) => {
  try {
    debugger;
    const reqUrl = `${backendUrl}/story/v1/getStoryById/${storyId}`;
    const response = await axios.get(reqUrl);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addStoryToBookmarks = async (storyId) => {
  try {
    
    const reqUrl = `${backendUrl}/story/v1/addBookmark/${storyId}`;
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    const response = await axios.post(reqUrl);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getBookmarkedStories = async () => {
  try {
    const reqUrl = `${backendUrl}/story/v1/getBookmarks`;
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getBookmarkedStoryById = async (storyId) => {
  try {
    const reqUrl = `${backendUrl}/story/v1/getBookmarkedStoryById/${storyId}`;
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    
    const response = await axios.get(reqUrl);
    return { exists: response.data.exists };
  } catch (error) {
    return { exists: false };
  }
};

const handleApiError = (error) => {
  if (error.response && error.response.data) {
    toast.error(error.response.data.error || "An error occurred");
  } else {
    toast.error("Network error");
  }
};
