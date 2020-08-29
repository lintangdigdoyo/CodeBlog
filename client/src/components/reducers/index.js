import { combineReducers } from 'redux';
import sidebar from './sidebarReducer';
import alerts from './alertReducer';
import auth from './authReducer';
import profile from './profileReducer';
import post from './postReducer';

export default combineReducers({
  sidebar,
  alerts,
  auth,
  profile,
  post,
});
