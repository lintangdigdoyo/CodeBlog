import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ReactComponent as Cardboard } from './cardboard.svg';
import { setColor, setRem } from '../../styles';
import Post from '../post/Post';
import { SmallButton } from '../globals/Button';

const Posts = ({
  className,
  post: { loading, posts },
  user,
  profile: { profile },
}) => {
  return (
    <div className={className}>
      {!loading && posts !== null && posts.length > 0
        ? posts.map((post) => <Post key={post._id} post={post} />)
        : posts !== null && (
            <div className='no-post'>
              <Cardboard />
              {user && profile && user._id === profile.user._id ? (
                <Fragment>
                  <p>You haven't posted anything yet. </p>
                  <SmallButton as={Link} to='/create-post'>
                    Create Post
                  </SmallButton>
                </Fragment>
              ) : (
                <p>{`${profile.user.name} hasn't posted anything yet.`} </p>
              )}
            </div>
          )}
    </div>
  );
};

export default styled(Posts)`
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
`;
