import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
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

//Register User
export const signUp = (formData) => async (dispatch) => {
  try {
    await api.post('/auth/signup', formData);
    dispatch({ type: REGISTER_SUCCESS });
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
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger', error.param))
      );
    }
  }
};

//Logout User
export const signOut = () => async (dispatch) => {
  try {
    await api.get('/auth/signout');
    dispatch({ type: LOGOUT });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};
