import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { ReactComponent as Cardboard } from './cardboard.svg';
import { getUserPosts } from '../actions/post';
import { setColor, setRem } from '../../styles';
import Post from '../post/Post';
import { SmallButton } from '../globals/Button';

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
      {!loading && (posts !== null) & (posts.length > 0)
        ? posts.map((post) => <Post key={post._id} post={post} />)
        : posts !== null && (
            <div className='no-post'>
              <Cardboard />
              <p>You haven't posted anything yet. </p>
              <SmallButton as={Link} to='/create-post'>
                Create Post
              </SmallButton>
            </div>
          )}
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

export default connect(mapStateToProps, { getUserPosts })(styled(Posts)`
  .no-post {
    color: ${setColor.darkGray};
    text-align: center;
    font-size: ${setRem(20)};
    height: 100vh;
    svg {
      width: 150px;
      height: 150px;
    }
    P {
      margin-bottom: 5%;
    }
    a {
      &:hover {
        color: white;
      }
    }
  }
`);
