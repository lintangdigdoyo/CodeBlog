import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setColor } from '../../styles';
import PostForm from './PostForm';

const CreatePost = ({
  className,
  history,
  auth: { loading, user },
  profile,
}) => {
  //Check user has profile or not
  if (!loading && user) {
    if (profile.profile === null && profile.hasProfile === false) {
      return <Redirect to='/create-profile' />;
    }
  }

  return (
    <div className={className}>
      <h1>Create a new post</h1>
      <PostForm history={history} />
    </div>
  );
};

CreatePost.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps)(styled(CreatePost)`
  margin: 5% 0;
  color: ${setColor.darkBlue};
  h1 {
    background-color: ${setColor.mainWhite};
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
    padding: 2%;
    font-weight: 600;
  }
`);
