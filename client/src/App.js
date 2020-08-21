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
import Landing from './components/landing/Landing';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import CreateProfile from './components/profile/CreateProfile';

const App = ({ loadUser, auth: { isAuthenticated } }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Fragment>
      <GlobalStyle lightBlue={isAuthenticated ? false : true} />
      <Router>
        <SidebarNav>
          <Navbar transparent={isAuthenticated ? false : true} />
          <Container>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route exact path='/register' component={SignUp} />
              <Route exact path='/login' component={SignIn} />
              <Route exact path='/create-profile' component={CreateProfile} />
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(App);
