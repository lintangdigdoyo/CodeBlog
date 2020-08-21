import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setColor } from '../../styles';
import imgAvatar from '../../images/avatar.jpg';

const Avatar = ({ className, auth: { loading, isAuthenticated, user } }) => {
  return (
    !loading &&
    isAuthenticated && (
      <img
        className={className}
        src={user.avatar ? user.avatar : imgAvatar}
        alt='avatar'
      />
    )
  );
};

Avatar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(styled(Avatar)`
  margin: 0;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid ${setColor.mainWhite};
`);
