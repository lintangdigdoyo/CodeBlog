import { VISIBILITY } from '../actions/types';

export default (state = false, action) => {
  switch (action.type) {
    case VISIBILITY:
      return action.payload;
    default:
      return state;
  }
};
