import { GET_POST, UPDATE_POST, POST_ERROR } from './types';
import axios from 'axios';

import { setAlert } from './alert';
import api from '../apis/api';

//Get all the user post
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

//Get a post
export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${postId}`);
    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create a new post
export const createPost = (formData, fileData, history, id) => async (
  dispatch
) => {
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

    history.push(`/profile/${id}`);
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

//Edit post
export const editPost = (formData, fileData, postId, history, id) => async (
  dispatch
) => {
  try {
    const { title, text } = formData;
    const { header, thumbnail } = fileData;

    const fd = new FormData();

    fd.append('title', title);
    fd.append('text', text);
    fd.append('header', header);
    fd.append('thumbnail', thumbnail);

    const res = await axios.patch(`/api/posts/${postId}`, fd);

    dispatch({ type: UPDATE_POST, payload: res.data });
    dispatch(setAlert('Post Updated', 'success'));

    history.push(`/profile/${id}`);
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

//Delete post
export const deletePost = (postId, history) => async (dispatch) => {
  try {
    const res = await api.delete(`/posts/${postId}`);
    dispatch({ type: UPDATE_POST, payload: res.data });
    dispatch(setAlert('Post Deleted', 'success'));
    if (history) {
      history.push('/');
    }
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add Comment
export const addComment = (formData, postId) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/${postId}/comments`, formData);
    dispatch({ type: UPDATE_POST, payload: res.data });
    dispatch(setAlert('Comment Added', 'success'));
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

//Like a post
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/${postId}/like`);
    dispatch({ type: UPDATE_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//unlike a post
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await api.delete(`/posts/${postId}/like`);
    dispatch({ type: UPDATE_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//dislike a post
export const addDislike = (postId) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/${postId}/dislike`);
    dispatch({ type: UPDATE_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.reponse.status },
    });
  }
};

//undislike a post
export const removeDislike = (postId) => async (dispatch) => {
  try {
    const res = await api.delete(`/posts/${postId}/dislike`);
    dispatch({ type: UPDATE_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
