import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskReducer";
import {thunk} from "redux-thunk";
import authReducer from "./authReducer";

const store = configureStore({
  reducer: {
    taskReducer,
    authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
