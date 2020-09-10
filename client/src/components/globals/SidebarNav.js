import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu, Sidebar } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { setVisible } from '../../actions/sidebar';

const SidebarNav = ({ sidebar, setVisible, children }) => {
  const renderSidebar = () => {
    return (
      <Fragment>
        <Sidebar
          as={Menu}
          animation='push'
          icon='labeled'
          onHide={() => setVisible(false)}
          vertical
          visible={sidebar}
          width='thin'
        >
          <Menu.Item as={Link} to='/'>
            <i className='fas fa-home fa-2x'></i>
            <br />
            Home
          </Menu.Item>
          <Menu.Item as={Link} to='/login'>
            <i className='fas fa-sign-in-alt fa-2x'></i>
            <br />
            Sign In
          </Menu.Item>
          <Menu.Item as={Link} to='/register'>
            <i className='fas fa-user-plus fa-2x'></i>
            <br />
            Sign Up
          </Menu.Item>
        </Sidebar>
      </Fragment>
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
};

const mapStateToProps = (state) => ({
  sidebar: state.sidebar,
});

export default connect(mapStateToProps, { setVisible })(SidebarNav);
