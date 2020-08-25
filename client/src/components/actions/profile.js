import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from './types';
import axios from 'axios';

import { setAlert } from './alert';
import api from '../apis/api';

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

//Clear profile data
export const clearProfile = () => {
  return { type: CLEAR_PROFILE };
};
