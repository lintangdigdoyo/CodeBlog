import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILE_FAIL,
} from '../actions/types';

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
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        hasProfile: true,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        error: payload,
        hasProfile: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: true,
        error: {},
        hasProfile: null,
      };
    default:
      return state;
  }
};
