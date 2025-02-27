import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT } from "../redux/authActions";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  error: null,
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          name: action.payload.name,
          email: action.payload.email,
          id: action.payload.id
        },
        token: action.payload.token,
        error: null,
      };

    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
