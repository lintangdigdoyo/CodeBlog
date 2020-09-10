import { SET_NAV } from './types';

export const setNav = (transparent) => {
  return {
    type: SET_NAV,
    payload: transparent,
  };
};
