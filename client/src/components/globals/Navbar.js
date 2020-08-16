import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setColor, setRem, setFont, media } from '../../styles';
import { ReactComponent as HamburgerMenu } from './hamburgerMenu.svg';
import { setVisible } from '../actions/sidebar';
import { SmallButton } from './Button';

const Navbar = ({ className, setVisible, sidebar }) => {
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

  return (
    <nav className={className}>
      <Link to='/'>
        <h4>CodeBlog</h4>
      </Link>
      <ul>
        <li>
          <Link to='/'>home</Link>
        </li>
        <li>
          <Link to='/'>sign in</Link>
        </li>
        <li className='button'>
          <SmallButton as={Link} to='/'>
            sign up
          </SmallButton>
        </li>
      </ul>
      <button className='hamburger' onClick={() => setVisible(!sidebar)}>
        <HamburgerMenu />
      </button>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  sidebar: state.sidebar,
});

export default connect(mapStateToProps, { setVisible })(styled(Navbar)`
  background-color: ${(props) =>
    props.transparent ? 'rgba(0,0,0,0)' : setColor.primaryColor};
  padding: 35px 10%;
  width: 100vw;
  height: ${setRem(41)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${setRem(16)};

  svg {
    width: 25px;
    height: 17px;
  }

  a {
    color: ${(props) =>
      props.transparent ? setColor.darkBlue : setColor.mainWhite};
    text-decoration: none;
    &:hover {
      color: ${setColor.mainBlue};
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
