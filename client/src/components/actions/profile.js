import { GET_PROFILE, PROFILE_ERROR } from './types';
import axios from 'axios';
import { setAlert } from './alert';
import { api, apiMultipart } from '../apis/api';

export const createProfile = (formData, file) => async (dispatch) => {
  try {
    const data = JSON.stringify(formData);
    const fd = new FormData();

    fd.append('data', data);
    fd.append('avatar', file);

    // const res1 = await api.post('/profiles', formData);
    await axios.post('/api/profiles', fd);

    // dispatch({ type: GET_PROFILE, payload: res1.data });
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
