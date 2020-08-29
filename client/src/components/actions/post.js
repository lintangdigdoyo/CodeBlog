import { GET_POST, POST_ERROR } from './types';
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
