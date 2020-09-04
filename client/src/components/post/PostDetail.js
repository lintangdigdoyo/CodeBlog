import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import { setColor } from '../../styles';
import Spinner from '../globals/Spinner';
import {
  getPost,
  deletePost,
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  addViewer,
  clearPost,
} from '../actions/post';
import Avatar from '../globals/Avatar';
import Modal from '../globals/Modal';
import Comment from './Comment';
import { removeAlert } from '../actions/alert';

const PostDetail = ({
  className,
  auth: { loading, user, isAuthenticated },
  match,
  getPost,
  post: { posts },
  deletePost,
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  addViewer,
  clearPost,
  removeAlert,
  history,
}) => {
  useEffect(() => {
    getPost(match.params.postId);
    addViewer(match.params.postId);
    return () => {
      clearPost();
      removeAlert();
    };
  }, [getPost, addViewer, match.params.postId, clearPost, removeAlert]);

  //Check if the avatar from the googleApi or not
  let postAvatar = '';
  if (posts !== null) {
    document.title = `${posts.title ? posts.title : 'Post'} | CodeBlog`;
    if (posts.user && posts.user.avatar) {
      const avatar = posts.user.avatar;
      if (avatar.split(':')[0] === 'https') {
        postAvatar = posts.user.avatar;
      } else if (avatar.split(':')[0] !== 'https') {
        postAvatar = `/${posts.user.avatar}`;
      }
    }
  }

  return loading || posts === null || Array.isArray(posts) ? (
    <Spinner />
  ) : (
    posts && (
      <Fragment>
        <section className={className}>
          <div className='header'>
            <div className='item'>
              <h2>{posts.title}</h2>
            </div>
            {user && posts.user && user._id === posts.user._id && (
              <div className='item edit'>
                <Link to={{ pathname: '/edit-post', post: posts }}>
                  <i className='far fa-edit fa-lg'></i>
                </Link>

                <Modal
                  title={`Delete ${posts.title}`}
                  content={`Are you sure want to delete ${posts.title}`}
                  submit='Delete'
                  submitData={() => deletePost(posts._id, history)}
                  danger
                >
                  <i className='far fa-trash-alt fa-lg'></i>
                </Modal>
              </div>
            )}
          </div>
          <div className='profile'>
            <Link to={`/profile/${posts.user._id}`}>
              <Avatar src={postAvatar} postAvatar={postAvatar} />
            </Link>
            <div className='detail'>
              <Link to={`/profile/${posts.user._id}`}>
                <span className='name'>{posts.user && posts.user.name}</span>
              </Link>
              <Moment format='ll'>{posts.date}</Moment>
            </div>
          </div>
          <div className='content'>
            {posts.header && <img src={`/${posts.header}`} alt='header' />}
            <p>{posts.text}</p>
          </div>
          <div className='statistic'>
            <div className='item'>
              <i className='far fa-eye fa-lg'></i>{' '}
              <span>{posts.viewer.length}</span>
            </div>
            {isAuthenticated ? (
              <div className='item thumbs'>
                {posts.like.filter((like) => like.user === user._id).length >
                0 ? (
                  <i
                    onClick={() => removeLike(posts._id)}
                    className='fas fa-thumbs-up fa-lg'
                  ></i>
                ) : (
                  <div className='like'>
                    <i className='far fa-thumbs-up fa-lg'></i>
                    <i
                      onClick={() => addLike(posts._id)}
                      className='fas fa-thumbs-up fa-lg'
                    ></i>
                  </div>
                )}{' '}
                <span>{posts.like.length}</span>
              </div>
            ) : (
              <div className='item'>
                <i className='far fa-thumbs-up fa-lg'></i>{' '}
                <span>{posts.like.length}</span>
              </div>
            )}

            {isAuthenticated ? (
              <div className='item thumbs'>
                {posts.dislike.filter((dislike) => dislike.user === user._id)
                  .length > 0 ? (
                  <i
                    onClick={() => removeDislike(posts._id)}
                    className='fas fa-thumbs-down fa-lg'
                  ></i>
                ) : (
                  <div className='dislike'>
                    <i className='far fa-thumbs-down fa-lg'></i>
                    <i
                      onClick={() => addDislike(posts._id)}
                      className='fas fa-thumbs-down fa-lg'
                    ></i>
                  </div>
                )}{' '}
                <span>{posts.dislike.length}</span>
              </div>
            ) : (
              <div className='item'>
                <i className='far fa-thumbs-down fa-lg'></i>{' '}
                <span>{posts.dislike.length}</span>
              </div>
            )}

            <div className='item'>
              <i className='far fa-comment fa-lg'></i>{' '}
              <span>{posts.comment.length}</span>
            </div>
          </div>
        </section>
        <Comment posts={posts} />
      </Fragment>
    )
  );
};

PostDetail.propTypes = {
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addDislike: PropTypes.func.isRequired,
  removeDislike: PropTypes.func.isRequired,
  addViewer: PropTypes.func.isRequired,
  clearPost: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {
  getPost,
  deletePost,
  addLike,
  removeLike,
  addDislike,
  removeDislike,
  addViewer,
  clearPost,
  removeAlert,
})(
  styled(PostDetail)`
    padding: 3%;
    margin: 5% 0 2% 0;
    position: relative;
    background-color: ${setColor.mainWhite};
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
    h2 {
      font-weight: 600;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item.edit {
        position: relative;
        height: 20px;
      }
      i {
        cursor: pointer;
      }
      i.fa-edit {
        position: absolute;
        right: 30px;
        color: ${setColor.darkBlue};
        &:hover {
          color: ${setColor.mainBlue};
        }
      }
      i.fa-trash-alt {
        right: 0;
        top: 0;
        position: absolute;
        color: ${setColor.dangerColor};
        &:hover {
          color: ${setColor.mainRed};
        }
      }
    }
    .profile {
      margin: 2% 0;
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 5px;
        cursor: pointer;
      }
      span {
        display: flex;
        color: ${setColor.mainBlack};
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      span.name {
        font-weight: 600;
      }
      time {
        color: ${setColor.darkGray};
      }
    }
    .content {
      img {
        width: 100%;
      }
      p {
        margin: 5% 0;
        text-indent: 5%;
      }
    }
    .statistic {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid ${setColor.darkBlue};
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      color: ${setColor.darkBlue};
      .item {
        width: 4%;
      }
      .item.thumbs {
        cursor: pointer;
        .like {
          display: inline-block;
          .fas.fa-thumbs-up {
            display: none;
          }
          &:hover {
            .far.fa-thumbs-up {
              display: none;
            }
            .fas.fa-thumbs-up {
              display: inline-block;
            }
          }
        }
        .dislike {
          display: inline-block;
          .fas.fa-thumbs-down {
            display: none;
          }
          &:hover {
            .far.fa-thumbs-down {
              display: none;
            }
            .fas.fa-thumbs-down {
              display: inline-block;
            }
          }
        }
      }
    }
  `
);
