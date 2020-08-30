import { GET_POST, POST_ERROR } from './types';
import axios from 'axios';

import { setAlert } from './alert';
import api from '../apis/api';

export const getUserPosts = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/profiles/${userId}`);
    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createPost = (formData, fileData) => async (dispatch) => {
  try {
    const { title, text } = formData;
    const { header, thumbnail } = fileData;

    const fd = new FormData();

    fd.append('title', title);
    fd.append('text', text);
    fd.append('header', header);
    fd.append('thumbnail', thumbnail);

    const res = await axios.post('/api/posts', fd);

    dispatch({ type: GET_POST, payload: res.data });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, 'danger', error.param))
      );
    }
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
