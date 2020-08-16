import { VISIBILITY } from './types';

export const setVisible = (visibility) => {
  return {
    type: VISIBILITY,
    payload: visibility,
  };
};
