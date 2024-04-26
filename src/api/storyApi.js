import axios from "axios";
import { toast } from "react-toastify";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const createStory = async (storyData) => {
  try {
    debugger;
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
    const reqUrl = `${backendUrl}/story/update/${storyId}`;
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
    const reqUrl = `${backendUrl}/story/like/${storyId}`;
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
    const reqUrl = `${backendUrl}/story/mine`;
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
    const reqUrl = `${backendUrl}/story/category?category=${category}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getStoryById = async (storyId) => {
  try {
    const reqUrl = `${backendUrl}/story/${storyId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const addStoryToBookmarks = async (storyId) => {
  try {
    const reqUrl = `${backendUrl}/bookmark/add/${storyId}`;
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
    const reqUrl = `${backendUrl}/bookmark/mine`;
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

const handleApiError = (error) => {
  if (error.response && error.response.data) {
    toast.error(error.response.data.error || "An error occurred");
  } else {
    toast.error("Network error");
  }
};
