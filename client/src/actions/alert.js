import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, name) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, name },
  });
  if (alertType === 'success') {
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  }
};

export const removeAlert = () => {
  return {
    type: REMOVE_ALERT,
  };
};
