import axios from "axios";
import { getToken } from "../../utils/getToken";

export const registerUser = async (data) => {
  try {
    debugger;
    // const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/v1/register`, data);
    const response = await axios.post(`http://localhost:8000/auth/v1/register`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logInUser = async (data) => {
  try {
    const response = await axios.post("/auth/v1/login", data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addLike = async (storyId) => {
  try {
    const config = getToken();
    const response = await axios.post(`/story/v1/addLikeToStory/${storyId}`, null, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addToBookmark = async (storyId) => {
  try {
    const config = getToken();
    const response = await axios.post(`/story/v1/addBookmark/${storyId}`, null, config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getBookmark = async () => {
  try {
    const config = getToken();
    const response = await axios.get("/story/v1/getBookmarks", config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMyStories = async () => {
  try {
    const config = getToken();
    const response = await axios.get("/story/v1/getMyStories", config);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
