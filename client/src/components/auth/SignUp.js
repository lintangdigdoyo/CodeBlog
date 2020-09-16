import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { setAlert, removeAlert } from '../../actions/alert';
import { setNav } from '../../actions/navbar';
import { signUp } from '../../actions/auth';
import { setColor, setRem, setFlex, media } from '../../styles';
import { PrimaryButton } from '../globals/Button';
import Alert from '../globals/Alert';

const SignUp = ({
  className,
  setNav,
  setAlert,
  alerts,
  removeAlert,
  signUp,
  auth: { loading, isAuthenticated },
}) => {
  useEffect(() => {
    setNav(true);
    return () => {
      removeAlert();
      setNav(false);
    };
  }, [removeAlert]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  if (!loading && isAuthenticated) {
    return <Redirect to='/create-profile' />;
  }

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const alertName = alerts.map((alert) => alert.name);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      removeAlert();
      setAlert('Password not match', 'danger', 'password');
    } else {
      removeAlert();
      signUp(formData);
    }
  };

  return (
    <div className={className}>
      <h1>Sign Up to CodeBlog</h1>
      <form onSubmit={onSubmit}>
        <div
          className={`input ${
            alertName.filter((alert) => alert === 'name').toString() && 'danger'
          }`}
        >
          <i className='far fa-user'></i>
          <input
            type='text'
            name='name'
            placeholder='Full Name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div
          className={`input ${
            alertName
              .filter((alert) => alert === 'email' || alert === 'user')
              .toString() && 'danger'
          }`}
        >
          <i className='fas fa-at'></i>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={onChange}
          />
        </div>
        <div
          className={`input ${
            alertName.filter((alert) => alert === 'password').toString() &&
            'danger'
          }`}
        >
          <i className='fas fa-key '></i>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={onChange}
          />
        </div>
        <div
          className={`input ${
            alertName.filter((alert) => alert === 'password').toString() &&
            'danger'
          }`}
        >
          <i className='fas fa-key'></i>
          <input
            type='password'
            name='password2'
            placeholder='Confirm Password'
            value={password2}
            onChange={onChange}
          />
        </div>
        <input type='submit' className='submit' value='Sign Up' />
      </form>
      <Alert />
      <div className='style'>
        <div className='line' />
        <span>OR</span>
        <div className='line' />
      </div>
      <PrimaryButton outline as='a' href='/api/auth/google'>
        <i className='fab fa-google'></i> Sign Up with Google
      </PrimaryButton>
    </div>
  );
};

SignUp.propTypes = {
  setAlert: PropTypes.func.isRequired,
  setNav: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setAlert,
  setNav,
  removeAlert,
  signUp,
})(styled(SignUp)`
  display: grid;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  align-content: center;
  grid-template-columns: 45%;
  grid-template-rows: 11%;
  ${media.tablet`
  grid-template-columns:100%;
  `};
  h1 {
    color: ${setColor.darkBlue};
    font-size: ${setRem(42)};
    justify-self: center;
    text-align: center;
  }
  form {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 10px;
  }
  .input {
    padding: 10px 10px;
    display: flex;
    border: 1px solid ${setColor.mainBlue};
    background-color: ${setColor.mainWhite};
    color: ${setColor.primaryColor};
  }
  .input.danger {
    border: 2px solid ${setColor.mainRed};
    i {
      color: ${setColor.dangerColor};
    }
    input::placeholder {
      color: ${setColor.dangerColor};
    }
  }

  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
  i {
    margin: 0 10px;
  }
  .submit {
    background-color: ${setColor.primaryColor};
    color: ${setColor.mainWhite};
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
    transition: 0.3s ease-in-out;
    &:hover {
      background-color: #0eb2cf;
    }
  }
  .line {
    width: 100px;
    height: 1px;
    background-color: ${setColor.darkBlue};
  }
  span {
    margin: 0 3%;
  }
  .style {
    ${setFlex()};
    margin: 3%;
    color: ${setColor.darkBlue};
  }
  a {
    min-width: 50%;
    font-weight: 400;
    justify-self: center;
    ${setFlex()};
    text-align: center;
  }
`);
