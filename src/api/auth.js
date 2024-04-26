import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

//api for user registration
export const registerUser = async ({ username, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/v1/register`;
    const reqPayload = { username, password };
    const response = await axios.post(reqUrl, reqPayload);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};

//api for user login
export const loginUser = async ({ username, password }) => {
  try {
    const reqUrl = `${backendUrl}/auth/v1/login`;
    const reqPayload = { username, password };
    const response = await axios.post(reqUrl, reqPayload);

    if (response.status === 201) return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Invalid request!");
    }
  }
};
