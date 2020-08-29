import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getUserPosts } from '../actions/post';
import Post from './Post';

const Posts = ({
  className,
  match,
  getUserPosts,
  post: { loading, posts },
}) => {
  useEffect(() => {
    getUserPosts(match.params.userId);
  }, [getUserPosts]);

  return (
    <div className={className}>
      {!loading && posts && posts.map((post) => <Post post={post} />)}
    </div>
  );
};

Posts.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getUserPosts })(styled(Posts)``);
