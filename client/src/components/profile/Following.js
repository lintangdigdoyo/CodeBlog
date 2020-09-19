import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { setColor } from '../../styles';
import Spinner from '../globals/Spinner';
import { getProfile } from '../../actions/profile';
import Avatar from '../globals/Avatar';
import Follower from './Follower';

const Following = ({
  className,
  match,
  auth: { loading },
  getProfile,
  profile,
}) => {
  useEffect(() => {
    getProfile(match.params.userId);
  }, [getProfile, match.params.userId]);

  return loading || profile === null ? (
    <Spinner />
  ) : (
    <div className={className}>
      <span>
        Total following:{' '}
        {
          profile.following.filter((following) => following.user !== null)
            .length
        }
      </span>
      <div className='following'>
        {profile.following.map((following, index) => {
          //Check if the avatar from the googleApi or not
          let profileAvatar = '';
          if (following.user && following.user.avatar) {
            const avatar = following.user.avatar;
            if (avatar.split(':')[0] === 'https') {
              profileAvatar = following.user.avatar;
            } else if (avatar.split(':')[0] !== 'https') {
              profileAvatar = `/${following.user.avatar}`;
            }
          }

          return (
            following.user && (
              <Fragment key={following.user._id}>
                <div className='profile'>
                  <Link to={`/profile/${following.user._id}`}>
                    <Avatar src={profileAvatar} profileAvatar={profileAvatar} />
                  </Link>
                  <div className='item'>
                    <Link to={`/profile/${following.user._id}`}>
                      <h4>{following.user.name}</h4>
                    </Link>
                  </div>
                </div>
                {profile.following.filter(
                  (following) => following.user !== null
                ).length > 1 &&
                  index + 1 !==
                    profile.following.filter(
                      (following) => following.user !== null
                    ).length && <div className='line' />}
              </Fragment>
            )
          );
        })}
      </div>
    </div>
  );
};

Following.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, {
  getProfile,
})(styled(Following)`
  margin: 5% 10%;
  min-height: 100vh;
  span {
    margin-bottom: 5px;
    color: ${setColor.darkGray};
  }
  .following {
    background-color: ${setColor.mainWhite};
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
    padding: 2%;
    margin: 5px 0;
  }
  .profile {
    display: flex;
    align-items: center;
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
