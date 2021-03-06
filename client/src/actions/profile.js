import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILE_FAIL,
  LOGOUT,
  CHECK_PASSWORD,
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
      type: GET_PROFILE_FAIL,
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

//update user profile
export const updateProfile = (formData, file, userId) => async (dispatch) => {
  try {
    const { country, location, status, website, skills, bio, name } = formData;

    const fd = new FormData();

    fd.append('country', country);
    fd.append('location', location);
    fd.append('status', status);
    fd.append('website', website);
    fd.append('skills', skills);
    fd.append('bio', bio);
    fd.append('name', name);
    fd.append('avatar', file);

    const res = await axios.patch(`/api/profiles/${userId}`, fd);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Profile Updated', 'success'));
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

//Update Skill
export const updateSkill = (formData, userId) => async (dispatch) => {
  try {
    const res = await api.patch(`/profiles/${userId}`, formData);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Skill Updated', 'success'));
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
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
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
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Update Experience
export const updateExperience = (formData, userId, experienceId) => async (
  dispatch
) => {
  try {
    const res = await api.patch(
      `/profiles/${userId}/experiences/${experienceId}`,
      formData
    );
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience Updated', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.map((error) =>
        dispatch(setAlert(error.msg, 'danger', error.param))
      );
    }
  }
};

//Delete experience
export const deleteExperience = (userId, experienceId) => async (dispatch) => {
  try {
    const res = await api.delete(
      `/profiles/${userId}/experiences/${experienceId}`
    );
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Experience Deleted', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//follow a user
export const followUser = (userId) => async (dispatch) => {
  try {
    const res = await api.post(`/profiles/${userId}/follow`);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//unfollow a user
export const unfollowUser = (userId) => async (dispatch) => {
  try {
    const res = await api.delete(`/profiles/${userId}/follow`);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create user password
export const createPassword = (newPassword) => async (dispatch) => {
  const formData = { newPassword };
  try {
    const res = await api.post('/user/password', formData);
    dispatch({ type: CHECK_PASSWORD, payload: res.data });
    dispatch(setAlert('User Account Updated', 'success'));
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

//Update user setting
export const updateUser = (formData) => async (dispatch) => {
  try {
    await api.patch('/user', formData);
    dispatch(setAlert('User Account Updated', 'success'));
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

//Clear profile data
export const clearProfile = () => {
  return { type: CLEAR_PROFILE };
};

//Delete Account
export const deleteAccount = (formData) => async (dispatch) => {
  try {
    await api.delete('/user', { data: formData });
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_PROFILE });
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
