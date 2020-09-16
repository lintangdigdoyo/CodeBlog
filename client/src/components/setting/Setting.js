import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Avatar from '../globals/Avatar';
import Spinner from '../globals/Spinner';
import { setColor, setRem } from '../../styles';
import { SmallButton } from '../globals/Button';
import Modal from '../globals/Modal';
import {
  updateUser,
  deleteAccount,
  createPassword,
} from '../../actions/profile';
import { checkUserPassword, clearPasswordCheck } from '../../actions/auth';
import Alert from '../globals/Alert';
import { removeAlert, setAlert } from '../../actions/alert';
import RemoveAccountForm from './RemoveAccountForm';

const Setting = ({
  className,
  auth: { user, hasPassword },
  updateUser,
  removeAlert,
  setAlert,
  alerts,
  deleteAccount,
  createPassword,
  checkUserPassword,
  clearPasswordCheck,
}) => {
  useEffect(() => {
    checkUserPassword();
    return () => {
      removeAlert();
      clearPasswordCheck();
    };
  }, [removeAlert, checkUserPassword, clearPasswordCheck]);

  const [formData, setFormData] = useState({
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [removeFormData, setRemoveFormData] = useState({
    password: '',
  });

  const { email, currentPassword, newPassword, confirmPassword } = formData;

  const alertName = alerts.map((alert) => alert.name);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onRemoveChange = (e) =>
    setRemoveFormData({ ...removeFormData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (hasPassword) {
      if (newPassword !== confirmPassword) {
        removeAlert();
        setAlert('Password not match', 'danger', 'password');
      } else {
        removeAlert();
        updateUser(formData);
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } else if (!hasPassword) {
      if (newPassword !== confirmPassword) {
        removeAlert();
        setAlert('Password not match', 'danger', 'password');
      } else {
        removeAlert();
        createPassword(newPassword);
        setFormData({
          ...formData,
          newPassword: '',
          confirmPassword: '',
        });
      }
    }
  };

  return typeof hasPassword === 'undefined' ? (
    <Spinner />
  ) : (
    <div className={className}>
      <h1>Account Settings</h1>
      <div className='line' />
      <div className='container'>
        <div className='side'>
          <Avatar />
          <h4>{user.name}</h4>
        </div>
        <div className='item'>
          <form onSubmit={onSubmit} autoComplete='off'>
            <label htmlFor='email'>Change Email</label>
            <input
              type='email'
              name='email'
              id='email'
              disabled={user.googleId}
              placeholder='Enter your email'
              className={
                alertName.filter((alert) => alert === 'email').toString() &&
                'danger'
              }
              onChange={onChange}
              value={email}
            />
            {user.googleId && (
              <p>
                can't change the user email that authenticated using google
                authentication
              </p>
            )}
            {hasPassword ? (
              <Fragment>
                <label htmlFor='password' className='password'>
                  Change Password
                </label>
                <input
                  type='password'
                  id='password'
                  placeholder='Current password'
                  className={
                    alertName
                      .filter((alert) => alert === 'currentPassword')
                      .toString() && 'danger'
                  }
                  name='currentPassword'
                  onChange={onChange}
                  value={currentPassword}
                />
                <input
                  type='password'
                  placeholder='New password'
                  className={
                    alertName
                      .filter(
                        (alert) =>
                          alert === 'newPassword' || alert === 'password'
                      )
                      .toString() && 'danger'
                  }
                  name='newPassword'
                  onChange={onChange}
                  value={newPassword}
                />
                <input
                  type='password'
                  placeholder='Re-type new password'
                  className={
                    alertName
                      .filter(
                        (alert) =>
                          alert === 'confirmPassword' || alert === 'password'
                      )
                      .toString() && 'danger'
                  }
                  name='confirmPassword'
                  onChange={onChange}
                  value={confirmPassword}
                />
              </Fragment>
            ) : (
              <Fragment>
                <label htmlFor='newPassword' className='password'>
                  Create New Password
                </label>
                <input
                  type='password'
                  placeholder='Enter the new password'
                  id='newPassword'
                  className={
                    alertName
                      .filter(
                        (alert) =>
                          alert === 'newPassword' || alert === 'password'
                      )
                      .toString() && 'danger'
                  }
                  name='newPassword'
                  onChange={onChange}
                  value={newPassword}
                />
                <input
                  type='password'
                  placeholder='Re-type new password'
                  className={
                    alertName
                      .filter(
                        (alert) =>
                          alert === 'confirmPassword' || alert === 'password'
                      )
                      .toString() && 'danger'
                  }
                  name='confirmPassword'
                  onChange={onChange}
                  value={confirmPassword}
                />
              </Fragment>
            )}

            <Alert />
            <SmallButton>Save</SmallButton>
          </form>
          <Modal
            title={`Are you absolutely sure want to delete ${user.name} account?`}
            submit='Delete Account'
            danger
            submitData={() => deleteAccount(removeFormData)}
            content={
              <RemoveAccountForm
                name={user.name}
                removeFormData={removeFormData}
                onRemoveChange={onRemoveChange}
                setRemoveFormData={setRemoveFormData}
              />
            }
          >
            <span>Do you want to delete your account?</span>
          </Modal>
        </div>
      </div>
    </div>
  );
};

Setting.propTypes = {
  auth: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  createPassword: PropTypes.func.isRequired,
  checkUserPassword: PropTypes.func.isRequired,
  clearPasswordCheck: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  alerts: state.alerts,
});

export default connect(mapStateToProps, {
  updateUser,
  deleteAccount,
  removeAlert,
  setAlert,
  checkUserPassword,
  createPassword,
  clearPasswordCheck,
})(
  styled(Setting)`
    margin: 5% 0;
    background-color: ${setColor.mainWhite};
    box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    padding: 2%;
    h1 {
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
      align-items: center;
      padding: 2%;
      .side {
        text-align: center;
        img {
          width: 150px;
          height: 150px;
        }
      }
      .item {
        form {
          input.danger {
            border: 2px solid ${setColor.mainRed};
            i {
              color: ${setColor.dangerColor};
            }
          }
          input.danger::placeholder {
            color: ${setColor.dangerColor};
          }
          labeL {
            color: ${setColor.darkBlue};
            font-weight: 600;
            font-size: ${setRem(18)};
            display: block;
          }
          label.password {
            margin-top: 15px;
          }
          input {
            display: block;
            width: 100%;
            margin-bottom: 10px;
            padding: 8px;
            border: 1px solid ${setColor.darkBlue};
          }
          input#email {
            margin-bottom: 0;
          }
          p {
            color: ${setColor.darkGray};
            margin: 0;
          }
          button {
            width: 115px;
          }
        }
        button.ui.button {
          display: block;
          text-align: left;
          margin: 10px 0;
          font-weight: 400;
          width: 100%;
          span {
            color: ${setColor.mainRed};
            &:hover {
              color: ${setColor.dangerColor};
            }
          }
        }
      }
    }
  `
);
