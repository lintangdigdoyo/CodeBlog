import { GET_POST, POST_ERROR } from '../actions/types';

const initialState = {
  posts: null,
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POST:
      return { ...state, posts: payload, loading: false };
    case POST_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};
