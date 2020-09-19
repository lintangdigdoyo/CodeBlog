import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import headerExplore from '../../images/headerExplore.jpg';
import Spinner from '../globals/Spinner';
import { setColor, setRem, setFlex, media } from '../../styles';
import Post from '../post/Post';
import { getPosts, getFollowedPosts, clearPost } from '../../actions/post';
import { getProfile } from '../../actions/profile';
import { SmallButton } from '../globals/Button';

const Home = ({
  className,
  getPosts,
  getFollowedPosts,
  clearPost,
  auth: { isAuthenticated, loading, user },
  post,
  profile,
  getProfile,
}) => {
  useEffect(() => {
    document.title = `${
      !isAuthenticated ? 'Explore | CodeBlog' : ' Home | CodeBlog'
    }`;
    if (user) {
      getProfile(user._id);
    }

    if (!loading && isAuthenticated && profile.hasProfile === true) {
      getFollowedPosts(user._id);
    } else if (
      (!loading && !isAuthenticated) ||
      (isAuthenticated && profile.hasProfile === false)
    ) {
      getPosts();
    }

    return () => {
      clearPost();
    };
  }, [getPosts, clearPost, isAuthenticated, profile.hasProfile]);

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
      {isAuthenticated && profile.hasProfile === true && (
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
        {post.posts.length > 0 ? (
          <Fragment>
            {!isAuthenticated && (
              <header>
                <h1>Explore & Gain Your Knowledge</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
                  quasi Laborum vero.
                </p>
                <SmallButton as={Link} to='/register'>
                  Sign up
                </SmallButton>
              </header>
            )}
            {post.posts.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </Fragment>
        ) : (
          <h4>No posts found</h4>
        )}
      </section>
    </div>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getFollowedPosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  clearPost: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getPosts,
  getFollowedPosts,
  clearPost,
  getProfile,
})(styled(Home)`
  margin: 2% 0 5% 0;
  min-height: 100vh;
  header {
    display: flex;
    flex-direction: column;
    background-position: center;
    background: linear-gradient(
        to top right,
        rgba(0, 0, 0, 1),
        rgba(0, 0, 0, 0)
      ),
      url(${headerExplore}) center;
    justify-content: center;
    background-size: cover;
    height: 400px;
    width: 100%;
    margin-bottom: 20px;
    padding: 0 50% 0 5%;
    color: ${setColor.mainWhite};
    h1 {
      font-size: ${setRem(60)};
    }
    p {
      font-size: ${setRem(20)};
    }
    a {
      width: 150px;
      ${setFlex};
      &:hover {
        color: ${setColor.mainWhite};
      }
    }
  }
  .navigation {
    background-color: ${setColor.mainWhite};
    box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
    padding: 1% 2%;
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
  ${media.tablet`
    header {
      padding-right: 25%;
    }
  `}
  ${media.phone`
    header {
      padding-right: 35%;
      h1 {
        font-size: ${setRem(40)};
      }
      p {
        font-size: ${setRem(20)};
      }
      a {
        width: 150px;
        height: 30px
      }
    }
  `}
  ${media.smallPhone`
    header {
      padding-right: 10%;
      h1 {
        font-size: ${setRem(35)};
      }
      p {
        font-size: ${setRem(15)};
      }
      a {
        width: 150px;
        height: 30px
      }
    }
  `}
`);
