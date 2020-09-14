import { GET_CHAT, UPDATE_CHAT, CLEAR_CHAT } from '../actions/types';

const initialState = {
  chats: [],
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CHAT:
      return {
        ...state,
        chats: payload,
        loading: false,
      };
    case UPDATE_CHAT:
      return {
        ...state,
        chats: payload,
        loading: false,
      };
    case CLEAR_CHAT:
      return {
        ...state,
        chats: [],
        loading: true,
      };
    default:
      return state;
  }
};
