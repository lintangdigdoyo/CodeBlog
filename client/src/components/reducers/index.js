import { combineReducers } from 'redux';
import sidebar from './sidebarReducer';
import alerts from './alertReducer';
import auth from './authReducer';
import profile from './profileReducer';

export default combineReducers({
  sidebar,
  alerts,
  auth,
  profile,
});
