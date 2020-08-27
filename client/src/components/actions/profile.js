import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
} from './types';
import axios from 'axios';

import api from '../apis/api';
import { setAlert } from './alert';

//get user profile
export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/profiles/${id}`);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create user profile
export const createProfile = (formData, file) => async (dispatch) => {
  try {
    const { country, location, status, website, skills, bio } = formData;

    const fd = new FormData();

    fd.append('country', country);
    fd.append('location', location);
    fd.append('status', status);
    fd.append('website', website);
    fd.append('skills', skills);
    fd.append('bio', bio);
    fd.append('avatar', file);

    const res = await axios.post('/api/profiles', fd);
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger', error.param))
      );
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Education
export const addEducation = (formData, id) => async (dispatch) => {
  try {
    const res = await api.post(`/profiles/${id}/educations`, formData);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger', error.param));
      });
    }
  }
};

//Update Education
export const updateEducation = (formData, userId, educationId) => async (
  dispatch
) => {
  try {
    const res = await api.patch(
      `/profiles/${userId}/educations/${educationId}`,
      formData
    );
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Education Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger', error.param));
      });
    }
  }
};

//Delete Education
export const deleteEducation = (userId, educationId) => async (dispatch) => {
  try {
    const res = await api.delete(
      `/profiles/${userId}/educations/${educationId}`
    );
    dispatch({ type: GET_PROFILE, payload: res.data });
    dispatch(setAlert('Education Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Experience
export const addExperience = (formData, userId) => async (dispatch) => {
  try {
    const res = await api.post(`/profiles/${userId}/experiences`, formData);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger', error.param))
      );
    }
  }
};

//Clear profile data
export const clearProfile = () => {
  return { type: CLEAR_PROFILE };
};
