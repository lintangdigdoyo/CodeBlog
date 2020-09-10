import {
  USER_LOADED,
  CHECK_PASSWORD,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_PASSWORD_CHECK,
} from './types';

import { setAlert } from './alert';
import api from '../apis/api';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/user');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Check if user has password or not
export const checkUserPassword = () => async (dispatch) => {
  try {
    const res = await api.get('/user/password');
    dispatch({ type: CHECK_PASSWORD, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Clear the password check
export const clearPasswordCheck = () => {
  return {
    type: CLEAR_PASSWORD_CHECK,
  };
};

//Register User
export const signUp = (formData) => async (dispatch) => {
  try {
    await api.post('/auth/signup', formData);
    dispatch({ type: REGISTER_SUCCESS });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger', error.param))
      );
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

//Login User
export const signIn = (formData) => async (dispatch) => {
  try {
    await api.post('/auth/signin', formData);
    dispatch({ type: LOGIN_SUCCESS });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger', error.param))
      );
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

//Logout User
export const signOut = () => async (dispatch) => {
  try {
    await api.get('/auth/signout');
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
