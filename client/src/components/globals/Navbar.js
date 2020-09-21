import React, { useState, useLayoutEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

import { setColor, setRem, setFont, media } from '../../styles';
import { setVisible } from '../../actions/sidebar';
import { SmallButton } from './Button';
import { signOut } from '../../actions/auth';
import Avatar from './Avatar';

const Navbar = ({
  className,
  setVisible,
  sidebar,
  auth: { isAuthenticated, loading, user },
  signOut,
  navbar,
}) => {
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (size > 576) {
    setVisible(false);
    setSize(0);
  }

  //dropdown menu
  const options = [
    {
      key: 'user',
      text: 'Account',
      icon: 'user',
      as: Link,
      to: user && `/profile/${user._id}`,
    },
    {
      key: 'chat',
      text: 'Chat',
      icon: 'chat',
      as: Link,
      to: '/messages',
    },
    {
      key: 'settings',
      text: 'Settings',
      icon: 'settings',
      as: Link,
      to: user && '/setting',
    },
    {
      key: 'sign-out',
      text: 'Sign Out',
      icon: 'sign out',
      onClick: signOut,
    },
  ];

  const DropdownAvatar = () => (
    <Dropdown
      trigger={<Avatar src={user && user.avatar} />}
      options={options}
      pointing='top left'
      icon={null}
    />
  );

  const privateLinks = (
    <ul>
      {user && (
        <Fragment>
          <li>
            <Link to='/home'>home</Link>
          </li>
          <li>
            <DropdownAvatar />
          </li>
          <li className='button'>
            <SmallButton as={Link} to='/create-post'>
              create post
            </SmallButton>
          </li>
        </Fragment>
      )}
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/home'>explore</Link>
      </li>
      <li>
        <Link to='/login'>sign in</Link>
      </li>
      <li className='button'>
        <SmallButton as={Link} to='/register'>
          sign up
        </SmallButton>
      </li>
    </ul>
  );

  return (
    <nav className={className}>
      <Link to={!loading && isAuthenticated ? '/home' : '/'}>
        <h4>CodeBlog</h4>
      </Link>
      {!loading && (
        <Fragment>
          {isAuthenticated ? privateLinks : guestLinks}
          <button className='hamburger' onClick={() => setVisible(!sidebar)}>
            <i
              className='fas fa-bars'
              style={{ color: !navbar && setColor.mainWhite }}
            ></i>
          </button>
        </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  setVisible: PropTypes.func.isRequired,
  sidebar: PropTypes.bool.isRequired,
  auth: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
  navbar: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  sidebar: state.sidebar,
  auth: state.auth,
  navbar: state.navbar,
});

export default connect(mapStateToProps, { setVisible, signOut })(styled(Navbar)`
  background-color: ${(props) =>
    props.transparent ? 'rgba(0,0,0,0)' : setColor.primaryColor};
  padding: 20px 10%;
  width: 100vw;
  height: ${setRem(70)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${setRem(16)};
  .item {
    i {
      color: ${setColor.darkBlue};
    }
    span {
      font-weight: 400;
    }
  }
  .ui.dropdown .menu .selected.item {
    background: ${setColor.mainWhite};
    &:hover {
      background: ${setColor.mainGray};
    }
  }
  img {
    &:hover {
      border: 3px solid ${setColor.mainGray};
    }
  }
  a {
    color: ${(props) =>
      props.transparent ? setColor.darkBlue : setColor.mainGray};
    text-decoration: none;
    transition: 0.3s ease-in-out;
    &:hover {
      color: ${(props) =>
        props.transparent ? setColor.mainBlue : setColor.mainWhite};
    }
  }
  button.hamburger {
    background: rgba(0, 0, 0, 0);
    border: 0;
    cursor: pointer;
    display: none;
  }
  .button {
    a {
      color: ${setColor.mainWhite};
    }
  }
  h4 {
    ${setFont.title}
    letter-spacing: 1px;
  }
  button {
    i {
      color: ${setColor.darkBlue};
    }
  }
  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    width: 20%;
    text-transform: capitalize;
    font-weight: 600;
    align-items: center;

    ${media.desktop`
        width: 30%;
    `}

    ${media.tablet`
        width: 50%;
    `}
  }
  ${media.phone`
    button.hamburger,svg{
        display:block;
    }
    ul{
      display: none;
    }`};
`);
