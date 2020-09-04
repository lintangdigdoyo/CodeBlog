import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Spinner from '../globals/Spinner';
import { setColor } from '../../styles';
import Post from '../post/Post';
import { getPosts, getFollowedPosts, clearPost } from '../actions/post';

const Home = ({
  className,
  getPosts,
  getFollowedPosts,
  clearPost,
  auth: { isAuthenticated, loading, user },
  post,
}) => {
  useEffect(() => {
    document.title = `${
      !isAuthenticated ? 'Explore | CodeBlog' : ' Home | CodeBlog'
    }`;
    if (!loading && isAuthenticated) {
      getFollowedPosts(user._id);
    } else if (!loading && !isAuthenticated) {
      getPosts();
    }

    return () => {
      clearPost();
    };
  }, [getPosts, clearPost, isAuthenticated]);

  const [underline, setUnderline] = useState({
    timeline: true,
    explore: false,
  });

  const { timeline, explore } = underline;

  return loading ||
    post.loading ||
    post.posts === null ||
    !Array.isArray(post.posts) ? (
    <Spinner />
  ) : (
    <div className={className}>
      {isAuthenticated && (
        <div className='navigation'>
          <Fragment>
            <Link
              to='#'
              style={{ borderBottom: timeline && '3px solid currentColor' }}
              onClick={() => {
                getFollowedPosts(user._id);
                setUnderline({ timeline: true, explore: false });
              }}
            >
              Timeline
            </Link>
            <Link
              to='#'
              style={{ borderBottom: explore && '3px solid currentColor' }}
              onClick={() => {
                getPosts();
                setUnderline({ timeline: false, explore: true });
              }}
            >
              Explore
            </Link>
          </Fragment>
        </div>
      )}

      <section style={{ margin: !isAuthenticated && '5%' }}>
        {post.posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </section>
    </div>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getFollowedPosts: PropTypes.func.isRequired,
  clearPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {
  getPosts,
  getFollowedPosts,
  clearPost,
})(styled(Home)`
  margin: 5% 0;
  .navigation {
    background-color: ${setColor.mainWhite};
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
    padding: 2%;
    margin-bottom: 2%;
    a {
      margin-right: 15px;
      color: ${setColor.darkBlue};
      font-weight: 600;
      &:hover {
        color: ${setColor.mainBlue};
      }
    }
  }
`);
