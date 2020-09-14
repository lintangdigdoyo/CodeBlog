import { GET_CHAT, UPDATE_CHAT, CLEAR_CHAT } from './types';

//Get chat
export const getChat = (data) => {
  return { type: GET_CHAT, payload: data };
};

//Update Chat
export const updateChat = (data) => {
  return { type: UPDATE_CHAT, payload: data };
};

//Clear Chat
export const clearChat = () => {
  return { type: CLEAR_CHAT };
};
