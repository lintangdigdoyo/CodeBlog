import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Avatar from '../globals/Avatar';
import { setColor, setRem } from '../../styles';
import { SmallButton } from '../globals/Button';

const Setting = ({ className, auth: { user } }) => {
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { email, currentPassword, newPassword, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={className}>
      <h2>Account Settings</h2>
      <div className='line' />
      <div className='container'>
        <div className='side'>
          <Avatar />
          <h4>{user.name}</h4>
        </div>
        <form onSubmit={onSubmit} autoComplete='off'>
          <label htmlFor='email'>Change Email</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter your email'
            onChange={onChange}
            value={email}
          />
          <label htmlFor='password'>Change Password</label>
          <input
            type='password'
            id='password'
            placeholder='Current password'
            name='currentPassword'
            onChange={onChange}
            value={currentPassword}
          />
          <input
            type='password'
            placeholder='New password'
            name='newPassword'
            onChange={onChange}
            value={newPassword}
          />
          <input
            type='password'
            placeholder='Confirm new password'
            name='confirmPassword'
            onChange={onChange}
            value={confirmPassword}
          />
          <span>Do you want to delete your account?</span>
          <SmallButton>Save</SmallButton>
        </form>
      </div>
    </div>
  );
};

Setting.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(styled(Setting)`
  margin: 5% 0;
  background-color: ${setColor.mainWhite};
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
  padding: 2%;
  h2 {
    text-align: center;
    padding: 10px 0;
    color: ${setColor.darkBlue};
  }
  .line {
    width: 100%;
    border: 1px solid ${setColor.mainGray};
    margin-bottom: 2%;
  }
  .container {
    display: grid;
    grid-template-columns: 25% auto;
    padding: 2%;
    .side {
      text-align: center;
      img {
        width: 150px;
        height: 150px;
      }
    }
    form {
      labeL {
        color: ${setColor.darkBlue};
        font-weight: 600;
        font-size: ${setRem(18)};
      }
      input {
        display: block;
        width: 100%;
        margin-bottom: 10px;
        padding: 8px;
        border: 1px solid ${setColor.darkBlue};
      }
      span {
        color: ${setColor.mainRed};
        display: block;
        margin-bottom: 10px;
      }
    }
  }
`);
