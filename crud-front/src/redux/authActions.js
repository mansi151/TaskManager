import axios from "axios";
import { toast } from "react-toastify"

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
export const LOGOUT = "LOGOUT";

const API_BASE_URL = 'http://localhost:5000/contact';

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/loginUser`, { email, password });

    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    localStorage.setItem("token", response.data?.token);
    localStorage.setItem('id', response.data?.id)
    localStorage.setItem('name', response.data?.name)
    toast.info('Login Successfully!')
    return true
  } catch (error) {
    toast.error('Please Enter Valid Detail!')
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message });
    return false
  }
};

export const signup = (firstName, lastName, email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signupUser`, {
      firstName,
      lastName,
      email,
      password,
    });

    dispatch({ type: SIGNUP_SUCCESS, payload: response.data });

    localStorage.setItem("token", response.data.token);
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.response?.data?.message });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("id")
  localStorage.removeItem('name')
  dispatch({ type: LOGOUT });
};
