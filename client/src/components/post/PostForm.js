import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { setColor } from '../../styles';
import { SmallButton } from '../globals/Button';
import { createPost } from '../actions/post';
import { removeAlert } from '../actions/alert';
import Alert from '../globals/Alert';

const PostForm = ({
  className,
  auth: { user },
  createPost,
  removeAlert,
  history,
  post,
}) => {
  useEffect(() => {
    document.title = 'Post';
    if (post) {
      setFormData({
        title: post.title,
        text: post.text,
      });
      setFileData({
        header: post.header,
        thumbnail: post.thumbnail,
      });
    }
    return () => {
      removeAlert();
    };
  }, [removeAlert, post]);

  const [formData, setFormData] = useState({
    title: '',
    text: '',
  });
  const [fileData, setFileData] = useState({
    header: '',
    thumbnail: '',
  });

  const { title, text } = formData;

  const onFormChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onUploadChange = (e) =>
    setFileData({ ...fileData, [e.target.name]: e.target.files[0] });

  const onSubmit = (e) => {
    e.preventDefault();
    removeAlert();

    if (!post) createPost(formData, fileData, history, user._id);
    else if (post) createPost(formData, fileData, history, user._id);
  };

  return (
    <form className={className} autoComplete='off' onSubmit={onSubmit}>
      <div className='item'>
        <div className='upload'>
          <label htmlFor='header'>
            <i className='fas fa-cloud-upload-alt'></i> Upload Header Image
            (max:500KB)
          </label>
          <input
            type='file'
            name='header'
            accept='image/*'
            onChange={onUploadChange}
          />
        </div>
        <div className='upload'>
          <label htmlFor='thumbnail'>
            <i className='fas fa-cloud-upload-alt'></i> Upload Thumbnail
            (max:500KB) <span>*</span>
          </label>
          <input
            type='file'
            name='thumbnail'
            accept='image/*'
            onChange={onUploadChange}
          />
        </div>
      </div>

      <div className='item'>
        <input
          type='text'
          id='title'
          name='title'
          placeholder='Write your post title...'
          value={title}
          onChange={onFormChange}
        />
        <textarea
          rows='15'
          cols='50'
          id='text'
          name='text'
          placeholder='Write your post content...'
          value={text}
          onChange={onFormChange}
        />
        <SmallButton>Publish</SmallButton>
        <SmallButton as={Link} to={`/profile/${user._id}`}>
          Cancel
        </SmallButton>
        <Alert />
      </div>
    </form>
  );
};

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createPost, removeAlert })(
  styled(PostForm)`
    .item {
      background-color: ${setColor.mainWhite};
      box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
      margin-bottom: 2%;
      padding: 2%;
    }
    .upload {
      margin-right: 5%;
    }
    input,
    textarea {
      display: block;
      border: 1px solid ${setColor.mainBlue};
      width: 100%;
      margin-bottom: 10px;
      line-height: 25px;
      padding: 5px;
      resize: none;
    }
    label {
      display: block;
      font-weight: 600;
    }
    input[type='file'] {
      display: inline-block;
      color: ${setColor.mainBlack};
      border: none;
      padding: 0;
    }
    .item:first-child {
      display: flex;
      padding-top: 5px;
      padding-bottom: 5px;
    }
    button {
      padding-top: 9px;
    }
    a {
      margin-left: 10px;
      background-color: ${setColor.mainGray};
      color: ${setColor.darkGray};
      &:hover {
        background-color: ${setColor.darkGray};
        color: ${setColor.mainBlack};
      }
    }
    span {
      color: ${setColor.mainRed};
    }
  `
);
