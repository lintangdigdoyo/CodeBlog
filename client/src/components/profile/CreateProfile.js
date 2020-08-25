import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { getProfile } from '../actions/profile';
import ProfileForm from './ProfileForm';
import { setColor } from '../../styles';

const CreateProfile = ({ className, getProfile, auth: { user }, profile }) => {
  useEffect(() => {
    document.title = 'Create Profile';
    if (user !== null) {
      getProfile(user._id);
    }
  }, [getProfile]);

  if (user && profile !== null) {
    return <Redirect to={`/profile/${user._id}`} />;
  }

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

CreateProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { getProfile })(styled(CreateProfile)`
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
`);
