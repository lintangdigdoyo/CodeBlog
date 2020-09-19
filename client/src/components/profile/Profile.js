import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Redirect, Link } from 'react-router-dom';

import Spinner from '../globals/Spinner';
import { getProfile, clearProfile } from '../../actions/profile';
import Avatar from '../globals/Avatar';
import { setColor, setFlex, media } from '../../styles';
import Education from './Education';
import Experience from './Experience';
import Skill from './Skill';
import Posts from './Posts';
import Modal from '../globals/Modal';
import Alert from '../globals/Alert';
import { removeAlert } from '../../actions/alert';
import UpdateProfile from './UpdateProfile';
import { updateProfile, followUser, unfollowUser } from '../../actions/profile';
import { getUserPosts, clearPost } from '../../actions/post';
import { SmallButton } from '../globals/Button';
import socket from '../../utils/socket';

const Profile = ({
  className,
  getProfile,
  auth: { loading, isAuthenticated, user },
  profile,
  match,
  clearProfile,
  removeAlert,
  updateProfile,
  followUser,
  unfollowUser,
  getUserPosts,
  clearPost,
  post,
}) => {
  useEffect(() => {
    getUserPosts(match.params.userId);
    getProfile(match.params.userId);
    return () => {
      removeAlert();
      clearProfile();
      clearPost();
    };
  }, [
    getUserPosts,
    getProfile,
    clearProfile,
    isAuthenticated,
    removeAlert,
    clearPost,
    match.params.userId,
  ]);

  const [formData, setFormData] = useState({
    country: '',
    location: '',
    status: '',
    website: '',
    skills: '',
    bio: '',
    name: '',
  });
  const [file, setFile] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState();

  //Check user has profile or not
  if (!loading && user && user._id === match.params.userId) {
    if (profile.profile === null && profile.hasProfile === false) {
      return <Redirect to='/create-profile' />;
    }
  }

  //Check profile exist or not
  if (!profile.loading && profile.profile === null) {
    return <Redirect to='/404' />;
  }

  //Check if the avatar from the googleApi or not
  let profileAvatar = '';
  if (profile.profile !== null) {
    document.title = `${profile.profile.user.name} | CodeBlog`;
    if (profile.profile.user.avatar) {
      const avatar = profile.profile.user.avatar;
      if (avatar.split(':')[0] === 'https') {
        profileAvatar = profile.profile.user.avatar;
      } else if (avatar.split(':')[0] !== 'https') {
        profileAvatar = `/${profile.profile.user.avatar}`;
      }
    }
  }

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onUploadChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onCreateRoomClick = () => {
    socket.emit('create room', {
      senderId: user && user._id,
      receiverId: profile.profile && profile.profile.user._id,
    });
  };

  return loading ||
    profile.hasProfile === null ||
    post.posts === null ||
    (profile.profile && profile.profile.user._id !== match.params.userId) ? (
    <Spinner />
  ) : (
    profile.profile && (
      <div className={className}>
        <Alert />
        <div className='user-profile'>
          <Avatar src={profileAvatar} profileAvatar={profileAvatar} />
          <div className='bio'>
            <h2>
              {profile.profile.user.name}
              {user && user._id === match.params.userId && (
                <Modal
                  title='Edit Profile'
                  submitData={() => updateProfile(formData, file, user._id)}
                  submit='Save'
                  scroll
                  content={
                    <UpdateProfile
                      formData={formData}
                      setFormData={setFormData}
                      profile={profile.profile}
                      onFormChange={onFormChange}
                      onUploadChange={onUploadChange}
                      imagePreviewUrl={imagePreviewUrl}
                      profileAvatar={profileAvatar}
                    />
                  }
                >
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
            <a
              href={profile.profile.website && profile.profile.website}
              target='_blank'
              rel='noopener noreferrer'
            >
              {profile.profile.website && profile.profile.website}
            </a>
            <div className='totalof'>
              <h5>
                {post.posts && post.posts.length} <span>Posts</span>
              </h5>
              <Link to={`${profile.profile.user._id}/follower`}>
                <h5>
                  {
                    profile.profile.follower.filter(
                      (follower) => follower.user !== null
                    ).length
                  }{' '}
                  <span>Followers</span>
                </h5>
              </Link>
              <Link to={`${profile.profile.user._id}/following`}>
                <h5>
                  {
                    profile.profile.following.filter(
                      (following) => following.user !== null
                    ).length
                  }{' '}
                  <span>Following</span>
                </h5>
              </Link>
            </div>
            {user && profile.profile.user._id !== user._id && (
              <div className='button'>
                {profile.profile.follower.filter(
                  (follower) => follower.user && follower.user._id === user._id
                ).length === 0 ? (
                  <SmallButton onClick={() => followUser(match.params.userId)}>
                    Follow
                  </SmallButton>
                ) : (
                  <SmallButton
                    onClick={() => unfollowUser(match.params.userId)}
                  >
                    Unfollow
                  </SmallButton>
                )}
                <SmallButton
                  as={Link}
                  onClick={onCreateRoomClick}
                  to={{
                    pathname: '/messages',
                    receiver: { user: profile.profile.user },
                  }}
                >
                  <i className='far fa-envelope'></i> Send Message
                </SmallButton>
              </div>
            )}
          </div>
        </div>

        <div className='container'>
          <aside>
            <Education />
            <Experience />
            <Skill />
          </aside>
          <section>
            <Posts post={post} user={user} profile={profile} />
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
  removeAlert: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  clearPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, {
  getProfile,
  clearProfile,
  removeAlert,
  updateProfile,
  getUserPosts,
  followUser,
  unfollowUser,
  clearPost,
})(
  styled(Profile)`
    margin: 5% 0;
    display: grid;
    justify-content: center;
    justify-items: center;
    grid-template-columns: 100%;
    text-transform: capitalize;
    .user-profile {
      display: flex;
      align-items: center;
      width: 45%;
      img {
        height: 200px;
        width: 200px;
        margin: 0 5%;
      }
      .bio {
        display: grid;
        row-gap: 5px;
        grid-template-columns: 150%;
        h2,
        p,
        a {
          margin: 0;
          display: flex;
        }
        a {
          &:hover {
            text-decoration: underline;
          }
        }
        h3,
        h4 {
          margin: 0;
          font-weight: 400;
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
          display: flex;
          a {
            color: ${setColor.mainBlack};
            &:hover {
              text-decoration: underline;
            }
          }
          h5 {
            margin: 0;
            margin-right: 10px;
          }
        }
        .button {
          display: flex;
          button {
            border-radius: 5px;
            margin-right: 10px;
          }
          a {
            background-color: ${setColor.mainBlue};
            border-radius: 5px;
            text-decoration: none;
            ${setFlex};
            &:hover {
              background-color: ${setColor.darkBlue};
              color: ${setColor.mainWhite};
            }
          }
          i.fa-envelope {
            color: ${setColor.mainWhite};
            font-size: 13px;
            margin-right: 5px;
          }
        }
      }
    }
    .container {
      margin: 5% 0;
      width: 100%;
      display: grid;
      grid-template-columns: 30% 60%;
      gap: 3%;
      aside {
        display: grid;
        row-gap: 50px;
      }
    }
    ${media.tablet`
      grid-template-columns: 1fr;
      .user-profile {
        flex-direction: column;
        .bio {
          justify-items: center;
          text-align: center;
          justify-content: center;
        }
      }
      .container {
        grid-template-columns: 1fr;
        section {
          order: 1;
        }
        aside {
          order: 2;
        }
      }
      ${media.phone`
        .container {
          margin: 15% 0;
        }
      `}
    `}
  `
);
