import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import { setVisible } from '../actions/sidebar';

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
          <Menu.Item as='a'>
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='gamepad' />
            Games
          </Menu.Item>
          <Menu.Item as='a'>
            <Icon name='camera' />
            Channels
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

const mapStateToProps = (state) => ({
  sidebar: state.sidebar,
});

export default connect(mapStateToProps, { setVisible })(SidebarNav);
