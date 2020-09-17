import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Menu, Sidebar } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { setVisible } from '../../actions/sidebar';
import { setColor } from '../../styles';
import { signOut } from '../../actions/auth';

const SidebarNav = ({
  sidebar,
  setVisible,
  children,
  className,
  signOut,
  auth: { isAuthenticated, user },
}) => {
  const guestLinks = (
    <Fragment>
      <Menu.Item as={Link} to='/'>
        <i className='fas fa-home fa-2x'></i>
        <br />
        <h5>Home</h5>
      </Menu.Item>
      <Menu.Item as={Link} to='/home'>
        <i className='fas fa-search-location fa-2x'></i>
        <br />
        <h5>Explore</h5>
      </Menu.Item>
      <Menu.Item as={Link} to='/login'>
        <i className='fas fa-sign-in-alt fa-2x'></i>
        <br />
        <h5>Sign In</h5>
      </Menu.Item>
      <Menu.Item as={Link} to='/register'>
        <i className='fas fa-user-plus fa-2x'></i>
        <br />
        <h5>Sign Up</h5>
      </Menu.Item>
    </Fragment>
  );

  const privateLinks = (
    <Fragment>
      <Menu.Item as={Link} to='/home'>
        <i className='fas fa-home fa-2x'></i>
        <br />
        <h5>Home</h5>
      </Menu.Item>
      <Menu.Item as={Link} to={`/profile/${user && user._id}`}>
        <i className='fas fa-user-alt fa-2x'></i>
        <h5>Account</h5>
      </Menu.Item>
      <Menu.Item as={Link} to='/create-post'>
        <i className='fas fa-plus-square fa-2x'></i>
        <br />
        <h5>Create Post</h5>
      </Menu.Item>
      <Menu.Item as={Link} to='/setting'>
        <i className='fas fa-cogs fa-2x'></i>
        <br />
        <h5>Settings</h5>
      </Menu.Item>
      <Menu.Item as={Link} to='#' onClick={signOut}>
        <i className='fas fa-sign-out-alt fa-2x'></i>
        <br />
        <h5>Sign Out</h5>
      </Menu.Item>
    </Fragment>
  );

  const renderSidebar = () => {
    return (
      <Sidebar
        as={Menu}
        animation='push'
        icon='labeled'
        onHide={() => setVisible(false)}
        vertical
        visible={sidebar}
        width='thin'
        className={className}
        style={{ backgroundColor: setColor.lightBlue }}
      >
        {isAuthenticated ? privateLinks : guestLinks}
      </Sidebar>
    );
  };

  return (
    <Sidebar.Pushable>
      {renderSidebar()}
      <Sidebar.Pusher dimmed={sidebar}>{children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

SidebarNav.propTypes = {
  sidebar: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sidebar: state.sidebar,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setVisible,
  signOut,
})(styled(SidebarNav)`
  i,
  h5 {
    color: ${setColor.darkBlue};
    margin: 0;
  }
  h5 {
    margin-top: 10px;
  }
`);
