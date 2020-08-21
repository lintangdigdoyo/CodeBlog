import { GET_PROFILE, PROFILE_ERROR } from './types';
import axios from 'axios';
import { setAlert } from './alert';
import api from '../apis/api';

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

    await axios.post('/api/profiles', fd);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger', error.param))
      );
    }
    dispatch({ type: PROFILE_ERROR });
  }
};
