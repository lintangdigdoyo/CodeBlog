import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setColor, setRem } from '../../styles';
import Alert from '../globals/Alert';
import { removeAlert } from '../../actions/alert';

const RemoveAccountForm = ({
  className,
  name,
  removeFormData,
  onRemoveChange,
  removeAlert,
  setRemoveFormData,
}) => {
  useEffect(() => {
    removeAlert();
    return () => {
      removeAlert();
      setRemoveFormData({
        password: '',
      });
    };
  }, [removeAlert]);

  return (
    <div className={className}>
      <p>
        <i className='fas fa-exclamation-triangle'></i>{' '}
        {`This action cannot be undone. This will permanently delete the
        ${name} account, and all the posts. Please type your password to
        confirm.`}
      </p>
      <input
        type='password'
        name='password'
        placeholder='Enter your password'
        value={removeFormData.password}
        onChange={onRemoveChange}
      />
      <Alert />
    </div>
  );
};

export default connect(null, { removeAlert })(styled(RemoveAccountForm)`
  p {
    background-color: ${setColor.lightDanger};
    padding: 15px;
    color: ${setColor.dangerColor};
    font-weight: 600;
    font-size: ${setRem(18)};
  }
  input {
    padding: 10px;
    display: block;
    width: 100%;
    margin: 15px 0;
    border: 1px solid ${setColor.darkBlue};
  }
`);
