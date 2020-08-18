import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Coder } from './coder.svg';
import { PrimaryButton } from '../globals/Button';
import { setRem, setColor, media } from '../../styles';

const Landing = ({ className }) => {
  useEffect(() => {
    document.title = 'Welcome to CodeBlog';
  }, []);

  return (
    <div className={className}>
      <h1>Welcome to CodeBlog</h1>
      <h4>Connect and Share Your knowledge with everyone </h4>
      <PrimaryButton as={Link} to='/register' className='signup'>
        sign up
      </PrimaryButton>
      <PrimaryButton
        as={Link}
        to='/login'
        outline={true ? 1 : 0}
        className='signin'
      >
        sign in
      </PrimaryButton>
      <Coder className='img' />
    </div>
  );
};

export default styled(Landing)`
  display: grid;
  grid-template-areas:
    '. . img'
    'title title img'
    'subtitle subtitle img'
    'signup signin img'
    '. . img';
  align-content: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10% 0;
  grid-template-rows: auto 160px 130px;
  grid-template-columns: 220px 250px;
  h1 {
    grid-area: title;
    font-size: ${setRem(66)};
    color: ${setColor.darkBlue};
  }
  h4 {
    grid-area: subtitle;
    color: ${setColor.mainBlue};
    font-size: ${setRem(30)};
  }
  .signup {
    grid-area: signup;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${setColor.mainWhite};
  }
  .signin {
    grid-area: signin;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img {
    grid-area: img;
    width: 450px;
    height: 450px;
    margin-left: 150px;
  }
  ${media.desktop`
    grid-template-rows: auto 100px 70px 80px;
    grid-template-columns: 200px 130px;
    .img {
      width: 350px;
      height: 350px;
    }
    h1 {
      font-size: ${setRem(46)};
    }
    h4 {
      font-size: ${setRem(20)};
    }
  `};
  ${media.tablet`
    grid-template-areas:
      'title title'
      'subtitle subtitle'
      'img img'
      'signup signin';
    grid-template-rows: auto 150px 350px 100px;
    grid-template-columns: 200px 200px;
    text-align: center;
    justify-items: center;
    h1 {
      font-size: ${setRem(66)};
    }
    h4 {
      font-size: ${setRem(30)};
    }
    .img{
      margin-left: 0px;
    }
  `};
  ${media.phone`
    h1 {
      font-size: ${setRem(56)};
    }
    h4 {
      font-size: ${setRem(20)};
      margin: 0 10%;
    }
  `}
`;
