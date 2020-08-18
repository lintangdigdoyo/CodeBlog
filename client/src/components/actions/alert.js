import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, name) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, name },
  });
};

export const removeAlert = () => {
  return {
    type: REMOVE_ALERT,
  };
};
