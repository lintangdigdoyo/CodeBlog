import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css';

import GlobalStyle from './components/globals/GlobalStyle';
import Navbar from './components/globals/Navbar';
import SidebarNav from './components/globals/SidebarNav';
import Landing from './components/Landing/Landing';

const App = () => {
  return (
    <Fragment>
      <GlobalStyle lightBlue />
      <SidebarNav>
        <Router>
          <Navbar transparent />
          <Container>
            <Switch>
              <Route exact path='/' component={Landing} />
            </Switch>
          </Container>
        </Router>
      </SidebarNav>
    </Fragment>
  );
};

const Container = styled.div`
  margin: 5% 10%;
`;

export default App;
