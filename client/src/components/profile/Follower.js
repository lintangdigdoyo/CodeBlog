import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { setColor } from '../../styles';
import Spinner from '../globals/Spinner';
import { SmallButton } from '../globals/Button';
import { getProfile } from '../actions/profile';
import Avatar from '../globals/Avatar';
import { followUser, unfollowUser } from '../actions/profile';

const Follower = ({
  className,
  match,
  auth: { loading, user },
  getProfile,
  profile,
  followUser,
  unfollowUser,
}) => {
  useEffect(() => {
    getProfile(match.params.userId);
  }, [getProfile, match.params.userId]);

  return loading || profile === null ? (
    <Spinner />
  ) : (
    <div className={className}>
      <span>Total followers: {profile.follower.length}</span>
      <div className='follower'>
        {profile.follower.map((follower) => {
          //Check if the avatar from the googleApi or not
          let profileAvatar = '';
          const avatar = follower.user.avatar;
          if (avatar.split(':')[0] === 'https') {
            profileAvatar = follower.user.avatar;
          } else if (avatar.split(':')[0] !== 'https') {
            profileAvatar = `/${follower.user.avatar}`;
          }
          console.log(
            profile.following.filter(
              (following) => following.user._id === follower.user._id
            ).length === 0
          );
          return (
            <Fragment key={follower.user._id}>
              <div className='profile'>
                <Avatar src={profileAvatar} profileAvatar={profileAvatar} />
                <div className='item'>
                  <Link to={`/profile/${follower.user._id}`}>
                    <h4>{follower.user.name}</h4>
                  </Link>
                  {profile.following.filter(
                    (following) => following.user._id === follower.user._id
                  ).length === 0 ? (
                    <SmallButton onClick={() => followUser(follower.user._id)}>
                      Follow
                    </SmallButton>
                  ) : (
                    <SmallButton
                      onClick={() => unfollowUser(follower.user._id)}
                    >
                      Unfollow
                    </SmallButton>
                  )}
                </div>
              </div>
              <div className='line' />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

Follower.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, {
  getProfile,
  followUser,
  unfollowUser,
})(styled(Follower)`
  margin: 5% 10%;
  span {
    margin-bottom: 5px;
    color: ${setColor.darkGray};
  }
  .follower {
    background-color: ${setColor.mainWhite};
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
    padding: 2%;
    margin: 5px 0;
  }
  .profile {
    display: flex;
    img {
      height: 60px;
      width: 60px;
      margin-right: 5px;
    }
    .item {
      h4 {
        margin-bottom: 5px;
        color: ${setColor.mainBlack};
        &:hover {
          text-decoration: underline;
        }
      }
      button {
        border-radius: 5px;
        padding: 5px;
      }
    }
  }
  .line {
    margin: 3% 0;
    width: 100%;
    border: 1px solid ${setColor.mainGray};
  }
`);
