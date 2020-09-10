import { combineReducers } from 'redux';
import sidebar from './sidebarReducer';
import navbar from './navbarReducer';
import alerts from './alertReducer';
import auth from './authReducer';
import profile from './profileReducer';
import post from './postReducer';

export default combineReducers({
  sidebar,
  navbar,
  alerts,
  auth,
  profile,
  post,
});
