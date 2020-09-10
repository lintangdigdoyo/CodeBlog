import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  CHECK_PASSWORD,
  CLEAR_PASSWORD_CHECK,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
} from '../actions/types';

const initialState = {
  loading: true,
  isAuthenticated: null,
  user: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };
    case CHECK_PASSWORD:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case CLEAR_PASSWORD_CHECK:
      return {
        ...state,
        hasPassword: undefined,
        loading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
};
