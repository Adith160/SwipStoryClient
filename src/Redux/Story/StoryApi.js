import axios from "axios";
import { getToken } from "../../utils/getToken";

const BASE_URL = `${process.env.REACT_APP_BACKEND_API}/api/v1/story`;

export const createStory = async (storyData) => {
  try {
    const config = getToken();
    const response = await axios.post(`${BASE_URL}/createStory`, storyData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateStory = async (id, storyData) => {
  try {
    const config = getToken();
    const response = await axios.put(`${BASE_URL}/updateStory/${id}`, storyData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const addLikeToStory = async (id) => {
  try {
    const config = getToken();
    const response = await axios.put(`${BASE_URL}/addLikeToStory/${id}`, null, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getStoryById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/getStoryById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getAllStoriesByCategory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getStoryByCat`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getMyStories = async () => {
  try {
    const config = getToken();
    const response = await axios.get(`${BASE_URL}/getMyStories`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const addStoryToBookmarks = async (story_id) => {
  try {
    const config = getToken();
    const response = await axios.post(`${BASE_URL}/addBookmark/${story_id}`, null, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getBookmarkedStories = async () => {
  try {
    const config = getToken();
    const response = await axios.get(`${BASE_URL}/getBookmarks`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
