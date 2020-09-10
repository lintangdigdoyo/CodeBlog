import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'semantic-ui-css/semantic.min.css';

import { loadUser } from './actions/auth';
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
import Follower from './components/profile/Follower';
import Following from './components/profile/Following';
import Setting from './components/setting/Setting';
import Chat from './components/chat/Chat';
import NotFound from './components/globals/NotFound';

const App = ({ navbar, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Fragment>
      <GlobalStyle lightBlue={navbar} />
      <Router>
        <SidebarNav>
          <Navbar transparent={navbar} />
          <Container>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/register' component={SignUp} />
              <Route exact path='/login' component={SignIn} />
              <Route exact path='/profile/:userId' component={Profile} />
              <Route
                exact
                path='/profile/:userId/follower'
                component={Follower}
              />
              <Route
                exact
                path='/profile/:userId/following'
                component={Following}
              />
              <Route exact path='/home' component={Home} />
              <Route exact path='/post/:postId' component={PostDetail} />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute exact path='/create-post' component={CreatePost} />
              <PrivateRoute exact path='/edit-post' component={EditPost} />
              <PrivateRoute exact path='/setting' component={Setting} />
              <PrivateRoute exact path='/messages' component={Chat} />
              <Route exact path='*' component={NotFound} />
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
  loadUser: PropTypes.func.isRequired,
  navbar: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  navbar: state.navbar,
});

export default connect(mapStateToProps, { loadUser })(App);
