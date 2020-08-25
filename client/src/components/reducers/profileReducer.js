import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE } from '../actions/types';

const initialState = {
  loading: true,
  profile: null,
  error: {},
  hasProfile: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false, hasProfile: true };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        profile: null,
        loading: false,
        hasProfile: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        error: {},
        hasProfile: null,
      };
    default:
      return state;
  }
};
