import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import Spinner from '../globals/Spinner';
import { getProfile, clearProfile } from '../actions/profile';
import Avatar from '../globals/Avatar';
import { setColor } from '../../styles';
import Education from './Education';
import Experience from './Experience';
import Skill from './Skill';
import Posts from './Posts';
import Modal from '../globals/Modal';
import Alert from '../globals/Alert';
import { removeAlert } from '../actions/alert';

const Profile = ({
  className,
  getProfile,
  auth: { loading, isAuthenticated, user },
  profile,
  match,
  clearProfile,
  alerts,
  removeAlert,
}) => {
  useEffect(() => {
    getProfile(match.params.userId);
    return () => {
      removeAlert();
      clearProfile();
    };
  }, [getProfile, clearProfile, isAuthenticated, removeAlert]);

  if (!loading && user && user._id === match.params.userId) {
    if (profile.profile === null && profile.hasProfile === false) {
      return <Redirect to='/create-profile' />;
    }
  }

  let profileAvatar = '';
  if (profile.profile !== null) {
    document.title = `${profile.profile.user.name} Profile`;
    if (profile.profile.user.avatar) {
      const avatar = profile.profile.user.avatar;
      if (avatar.split(':')[0] === 'https') {
        profileAvatar = profile.profile.user.avatar;
      } else if (avatar.split(':')[0] !== 'https') {
        profileAvatar = `/${profile.profile.user.avatar}`;
      }
    }
  }

  return loading || profile.profile === null ? (
    <Spinner />
  ) : (
    profile.profile && (
      <div className={className}>
        <Alert />
        <div className='user-profile'>
          <Avatar src={profileAvatar} />
          <h2>
            {profile.profile.user.name}
            {user && user._id === match.params.userId && (
              <Modal title='Edit Profile' content='aaa'>
                <i className='far fa-edit'></i>
              </Modal>
            )}
          </h2>
          <h3>{profile.profile.status}</h3>
          <h4>
            {profile.profile.location && profile.profile.location}
            {profile.profile.location && ', '}
            {profile.profile.country}
          </h4>
          <p>{profile.profile.bio && profile.profile.bio}</p>
          <a href={profile.profile.website && profile.profile.website}>
            {profile.profile.website && profile.profile.website}
          </a>
          <div className='totalof'>
            <h5>
              10 <span>Posts</span>
            </h5>
            <h5>
              85 <span>Followers</span>
            </h5>
            <h5>
              20 <span>Following</span>
            </h5>
          </div>
        </div>
        <div className='container'>
          <aside>
            <Education />
            <Experience />
            <Skill />
          </aside>
          <section>
            <Posts />
          </section>
        </div>
      </div>
    )
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  clearProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  alerts: state.alerts,
});

export default connect(mapStateToProps, {
  getProfile,
  clearProfile,
  removeAlert,
})(
  styled(Profile)`
    margin: 5% 0;
    display: grid;
    justify-content: center;
    justify-items: center;
    grid-template-columns: 100%;
    text-transform: capitalize;
    .user-profile {
      display: grid;
      gap: 5%;
      grid-template-columns: 50% 70%;
      grid-template-areas:
        'avatar name'
        'avatar status'
        'avatar location'
        'avatar bio'
        'avatar website'
        'avatar totalof';
      img {
        grid-area: avatar;
        height: 200px;
        width: 200px;
        margin: 0 5%;
      }
      h2 {
        grid-area: name;
        margin: 0;
      }
      h3 {
        grid-area: status;
        margin: 0;
        font-weight: 400;
      }
      h4 {
        grid-area: location;
        margin: 0;
        font-weight: 400;
      }
      p {
        grid-area: bio;
        margin: 0;
      }
      a {
        grid-area: website;
        margin: 0;
      }
      i {
        font-size: 20px;
        color: ${setColor.darkBlue};
        cursor: pointer;
        &:hover {
          color: ${setColor.mainBlue};
          transition: 0.3s ease-in-out;
        }
      }
      span {
        font-weight: 400;
      }
      .totalof {
        grid-area: totalof;
        display: flex;
        h5 {
          margin: 0;
          margin-right: 10px;
        }
      }
    }
    .container {
      margin: 5% 0;
      width: 100%;
      display: grid;
      grid-template-columns: 30% 60%;
      gap: 3%;
    }
    aside {
      display: grid;
      row-gap: 50px;
    }
  `
);
