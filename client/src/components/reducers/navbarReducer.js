import { SET_NAV } from '../actions/types';

export default (state = false, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_NAV:
      return payload;
    default:
      return state;
  }
};
