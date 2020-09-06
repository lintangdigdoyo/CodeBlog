import React from 'react';
import styled from 'styled-components';

import { setColor, setRem } from '../../styles';

const removeAccountForm = ({
  className,
  name,
  removeFormData,
  onRemoveChange,
}) => (
  <form autoComplete='off' className={className}>
    <p>
      <i className='fas fa-exclamation-triangle'></i>{' '}
      {`This action cannot be undone. This will permanently delete the
        ${name} account, and all the posts. Please type your password to
        confirm.`}
    </p>
    <input
      type='password'
      name='password'
      id='password'
      placeholder='Enter your password'
      value={removeFormData.password}
      onChange={onRemoveChange}
    />
    <input
      type='password'
      name='confirmPassword'
      placeholder='Confirm password'
      value={removeFormData.confirmPassword}
      onChange={onRemoveChange}
    />
  </form>
);

export default styled(removeAccountForm)`
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
`;
