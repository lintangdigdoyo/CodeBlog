import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';

import { loadUser } from './components/actions/auth';
import GlobalStyle from './components/globals/GlobalStyle';
import Navbar from './components/globals/Navbar';
import SidebarNav from './components/globals/SidebarNav';
import PrivateRoute from './components/routing/PrivateRoute';
import Landing from './components/landing/Landing';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import CreateProfile from './components/profile/CreateProfile';
import Profile from './components/profile/Profile';
import CreatePost from './components/post/CreatePost';
import EditPost from './components/post/EditPost';
import Home from './components/home/Home';
import PostDetail from './components/post/PostDetail';

const App = ({
  loadUser,
  auth: { isAuthenticated },
  profile,
  post: { posts },
}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Fragment>
      <GlobalStyle
        lightBlue={isAuthenticated || profile !== null || posts ? false : true}
      />
      <Router>
        <SidebarNav>
          <Navbar
            transparent={
              isAuthenticated || profile !== null || posts ? false : true
            }
          />
          <Container>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/register' component={SignUp} />
              <Route exact path='/login' component={SignIn} />
              <Route exact path='/profile/:userId' component={Profile} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/post/:postId' component={PostDetail} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute exact path='/create-post' component={CreatePost} />
              <PrivateRoute exact path='/edit-post' component={EditPost} />
            </Switch>
          </Container>
        </SidebarNav>
      </Router>
    </Fragment>
  );
};

const Container = styled.div`
  margin: 0 10%;
`;

App.propTypes = {
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
  post: state.post,
});

export default connect(mapStateToProps, { loadUser })(App);
