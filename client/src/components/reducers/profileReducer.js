import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
  loading: true,
  profile: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
    case PROFILE_ERROR:
      return { ...state, profile: null, loading: false };
    default:
      return state;
  }
};
