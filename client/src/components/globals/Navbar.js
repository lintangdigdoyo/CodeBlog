import React, { useState, useLayoutEffect, Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';

import { setColor, setRem, setFont, media } from '../../styles';
import { ReactComponent as HamburgerMenu } from './hamburgerMenu.svg';
import { setVisible } from '../actions/sidebar';
import { SmallButton } from './Button';
import { signOut } from '../actions/auth';
import Avatar from './Avatar';

const Navbar = ({
  className,
  setVisible,
  sidebar,
  auth: { isAuthenticated, loading, user },
  signOut,
}) => {
  const useWindowSize = () => {
    const [size, setSize] = useState(0);

    useLayoutEffect(() => {
      const updateSize = () => {
        setSize(window.innerWidth);
      };
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
  };

  if (useWindowSize() > 576) {
    setVisible(false);
  }

  //dropdown menu
  const options = [
    { key: 'user', text: 'Account', icon: 'user', as: Link, to: '/' },
    { key: 'settings', text: 'Settings', icon: 'settings' },
    {
      key: 'sign-out',
      text: 'Sign Out',
      icon: 'sign out',
      onClick: signOut,
    },
  ];

  const DropdownAvatar = () => (
    <Dropdown
      trigger={<Avatar />}
      options={options}
      pointing='top left'
      icon={null}
    />
  );

  const privateLinks = (
    <ul>
      <li>
        <Link to='/'>home</Link>
      </li>

      {user && (
        <Fragment>
          <li>
            <DropdownAvatar />
          </li>
          <li className='button'>
            <SmallButton as={Link} to='/'>
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
        <Link to='/'>home</Link>
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
      <Link to='/'>
        <h4>CodeBlog</h4>
      </Link>
      {!loading && (
        <Fragment>
          {isAuthenticated ? privateLinks : guestLinks}
          <button className='hamburger' onClick={() => setVisible(!sidebar)}>
            <HamburgerMenu />
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
};

const mapStateToProps = (state) => ({
  sidebar: state.sidebar,
  auth: state.auth,
});

export default connect(mapStateToProps, { setVisible, signOut })(styled(Navbar)`
  background-color: ${(props) =>
    props.transparent ? 'rgba(0,0,0,0)' : setColor.primaryColor};
  padding: 35px 10%;
  width: 100vw;
  height: ${setRem(41)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${setRem(16)};

  .item {
    i {
      color: ${setColor.darkBlue};
    }
  }
  img {
    &:hover {
      border: 3px solid ${setColor.mainGray};
    }
  }
  svg {
    width: 25px;
    height: 17px;
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

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    width: 20%;
    text-transform: capitalize;
    font-weight: 600;
    align-items: center;

    ${media.desktop`
        width: 25%;
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
