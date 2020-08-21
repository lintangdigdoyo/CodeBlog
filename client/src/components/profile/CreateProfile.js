import React, { useEffect } from 'react';
import styled from 'styled-components';

import ProfileForm from './ProfileForm';
import { setColor } from '../../styles';

const CreateProfile = ({ className }) => {
  useEffect(() => {
    document.title = 'Create Profile';
  }, []);

  return (
    <div className={className}>
      <h1>Create Your Profile</h1>
      <h4>Let's fill your information so everyone will know you better.</h4>
      <h5>
        <span>*</span> = required field
      </h5>
      <ProfileForm />
    </div>
  );
};

export default styled(CreateProfile)`
  margin: 5% 0;
  margin-left: 5%;
  h1 {
    color: ${setColor.darkBlue};
    margin: 0;
  }
  h4 {
    color: ${setColor.mainBlue};
    margin: 0;
  }
  h5 {
    color: ${setColor.darkBlue};
    font-weight: 400;
  }
  span {
    color: ${setColor.mainRed};
  }
`;
