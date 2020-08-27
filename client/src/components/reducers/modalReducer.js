import { MODAL_OPEN, MODAL_CLOSE } from '../actions/types';

const initialState = {
  open: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MODAL_CLOSE:
      return { ...state, open: false };
    case MODAL_OPEN:
      return { ...state, open: true };
    default:
      return state;
  }
};
