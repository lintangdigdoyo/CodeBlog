import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setColor } from '../../styles';
import imgAvatar from '../../images/avatar.jpg';

const Avatar = ({ className, auth: { loading, user }, src, profile }) => {
  let userAvatar,
    profileAvatar = '';
  if (user !== null) {
    if (user.avatar) {
      const avatar = user.avatar;
      if (avatar.split(':')[0] === 'https') {
        userAvatar = user.avatar;
      } else if (avatar.split(':')[0] !== 'https') {
        userAvatar = `/${user.avatar}`;
      }
    }
  } else if (profile !== null) {
    if (profile.user.avatar) {
      const avatar = profile.user.avatar;
      if (avatar.split(':')[0] === 'https') {
        profileAvatar = profile.user.avatar;
      } else if (avatar.split(':')[0] !== 'https') {
        profileAvatar = `/${profile.user.avatar}`;
      }
    }
  }
  return !loading && user ? (
    <img
      className={className}
      src={src ? src : user.avatar ? userAvatar : imgAvatar}
      alt='avatar'
    />
  ) : (
    <img className={className} src={profileAvatar || imgAvatar} alt='avatar' />
  );
};

Avatar.propTypes = {
  auth: PropTypes.object.isRequired,
  src: PropTypes.string,
  profile: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
});

export default connect(mapStateToProps)(styled(Avatar)`
  margin: 0;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid ${setColor.mainWhite};
`);
