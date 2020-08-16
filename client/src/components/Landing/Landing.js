import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Coder } from './coder.svg';
import { PrimaryButton } from '../globals/Button';
import { setRem, setColor } from '../../styles';

const Landing = ({ className }) => {
  useEffect(() => {
    document.title = 'Welcome to CodeBlog';
  }, []);

  return (
    <div className={className}>
      <h1>Welcome to CodeBlog</h1>
      <h4>Connect and Share Your knowledge with everyone </h4>
      <PrimaryButton as={Link} to='/' className='signup'>
        sign up
      </PrimaryButton>
      <PrimaryButton as={Link} to='/' outline className='signin'>
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
  justify-content: center;
  width: 100%;
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
    width: 500px;
    height: 500px;
    margin-left: 150px;
  }
`;
