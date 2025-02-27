import axios from "axios";
import {toast} from "react-toastify"
// Define action types
export const FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const UPDATE_TASK = "UPDATE_TASK"
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS"
// API Base URL
const API_URL = "http://localhost:5000/tasks"; // Replace with your actual API URL

// Fetch Tasks (GET)
export const fetchTasks = (id) => async (dispatch,getState) => {
    console.log('Enter.here?',id)
  dispatch({ type: FETCH_TASKS_REQUEST });
  try {
    console.log('ENter....innnn',getState().authReducer.token)
    // Retrieve token from Redux state or localStorage
    const token = getState()?.authReducer?.token|| localStorage.getItem("token");
    console.log('token..',token)
    if (!token) {
      return dispatch({ type: FETCH_TASKS_FAILURE, payload: "No token provided" });
    }

    // Set up headers with Authorization token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log('config..',config)
    // Make API request with headers
    const response = await axios.get(API_URL+`/${id}`, config);
    console.log("Response:", response);
    if (response.data.message) {
      toast.message(response.data.message);
    } else {
      dispatch({ type: FETCH_TASKS_SUCCESS, payload: response.data });
    }
  } catch (error) {
    handleAuthError(error, dispatch);
    toast.error("Failed to fetch tasks!");
  }
};

// Add Task (POST)
export const addTask = (taskData) => async (dispatch, getState) => {
    try {
      const token = getState()?.authReducer?.token || localStorage.getItem("token");
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token here
          "Content-Type": "application/json",
        },
      };
  
      const response = await axios.post(API_URL, taskData, config);
      
      dispatch({ type: "ADD_TASK_SUCCESS", payload: response.data });
      toast.success("Task added successfully!");
    } catch (error) {
      handleAuthError(error, dispatch);
      dispatch({ type: "ADD_TASK_FAILURE", payload: error.response?.data?.message || "Failed to add task" });
      toast.error("Failed to add task!"); 
    }
  };

  export const updateTask = (taskId, updatedTask) => async (dispatch, getState) => {
    try {
      const token = getState()?.authReducer?.token ||localStorage.getItem("token"); ;
      const response = await axios.put(`${API_URL}/${taskId}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: UPDATE_TASK, payload: response.data });
      toast.info("Task updated successfully!");
    } catch (error) {
     handleAuthError(error, dispatch);
      console.error("Error updating task:", error);
      toast.error("Failed to update task!");
    }
  };

  export const deleteTask = (taskId) => async (dispatch, getState) => {
    try {
      const { authReducer } = getState();
      const token = authReducer?.token ||localStorage.getItem("token");
      await axios.delete(`${API_URL}/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      dispatch({ type: DELETE_TASK_SUCCESS, payload: taskId });
      toast.warn("Task deleted Successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task!");
    }
  };


  const handleAuthError = (error, dispatch) => {
    if (error.response && error.response.status === 401) {
      toast.error("Session expired! Please log in again.");
      localStorage.removeItem("token"); 
      dispatch({ type: LOGOUT });
      window.location.href = "/login"; 
    }
  };