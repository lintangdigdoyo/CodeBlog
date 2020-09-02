import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Moment from 'react-moment';

import { setColor, setRem } from '../../styles';
import { SmallButton } from '../globals/Button';
import { addComment } from '../actions/post';
import Avatar from '../globals/Avatar';

const Comment = ({
  className,
  posts,
  addComment,
  auth: { isAuthenticated, user },
}) => {
  const [formData, setFormData] = useState({
    text: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(formData, posts._id);
  };

  const renderComment = () =>
    posts.comment.map((comment) => {
      //Check if the avatar from the googleApi or not
      let commentAvatar = '';
      if (posts.user && comment.user.avatar) {
        const avatar = comment.user.avatar;
        if (avatar.split(':')[0] === 'https') {
          commentAvatar = comment.user.avatar;
        } else if (avatar.split(':')[0] !== 'https') {
          commentAvatar = `/${comment.user.avatar}`;
        }
      }
      return (
        <div className='comments' key={comment._id}>
          <Link className='avatar' to={`/profile/${comment.user._id}`}>
            <Avatar src={commentAvatar} commentAvatar={commentAvatar} />
          </Link>
          <div className='name'>
            <Link to={`/profile/${comment.user._id}`}>{comment.user.name}</Link>
            <Moment fromNow>{comment.date}</Moment>
          </div>

          <p>{comment.text}</p>
          {isAuthenticated && comment.user._id === user._id && (
            <Fragment>
              <i className='far fa-edit fa-lg'></i>
              <i className='far fa-trash-alt fa-lg'></i>
            </Fragment>
          )}
        </div>
      );
    });

  return (
    <div className={className}>
      {isAuthenticated && (
        <Fragment>
          <label htmlFor='comment'>Comment</label>
          <form onSubmit={onSubmit}>
            <textarea
              name='text'
              cols='30'
              rows='10'
              id='comment'
              placeholder='What do you think about this post...'
              value={formData.text}
              onChange={(e) => setFormData({ text: e.target.value })}
            ></textarea>
            <SmallButton>Send</SmallButton>
          </form>
          <div className='line' />
        </Fragment>
      )}
      {renderComment()}
    </div>
  );
};

Comment.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addComment })(styled(Comment)`
  padding: 3%;
  margin-bottom: 5%;
  background-color: ${setColor.mainWhite};
  box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
  label {
    font-weight: 600;
    color: ${setColor.darkBlue};
    font-size: ${setRem(24)};
  }
  textarea {
    width: 100%;
    resize: none;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid ${setColor.darkGray};
  }
  .line {
    margin: 3% 0;
    width: 100%;
    border: 1px solid ${setColor.mainGray};
  }
  .comments {
    border: 2px solid ${setColor.mainGray};
    width: 100%;
    height: 70px;
    display: grid;
    align-items: center;
    padding: 10px;
    margin-bottom: 1%;
    grid-template-areas:
      'avatar name edit delete'
      'avatar comment comment comment';
    grid-template-columns: 50px 1fr 4.5%;
    .avatar {
      grid-area: avatar;
    }
    .name {
      grid-area: name;
      a {
        font-weight: 600;
        color: ${setColor.mainBlack};
        &:hover {
          text-decoration: underline;
        }
      }
    }
    time {
      color: ${setColor.darkGray};
      font-weight: 400;
      font-size: ${setRem(14)};
      margin-left: 10px;
    }
    p {
      grid-area: comment;
    }
    .fa-edit {
      grid-area: edit;
      cursor: pointer;
      color: ${setColor.darkBlue};
      &:hover {
        color: ${setColor.mainBlue};
      }
    }
    .fa-trash-alt {
      grid-area: delete;
      cursor: pointer;
      color: ${setColor.dangerColor};
      &:hover {
        color: ${setColor.mainRed};
      }
    }
  }
`);
