import React, { Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setColor, setFlex } from '../../styles';
import Modal from '../globals/Modal';
import { deletePost } from '../actions/post';

const Post = ({ className, post, deletePost, auth }) => {
  return (
    <div className={className}>
      <Link to={`/post/${post._id}`}>
        <div className='content'>
          <img src={`/${post.thumbnail}`} alt='thumbnail' />
          <h4>{post.title}</h4>
          <p>
            {post.text.length > 300 ? post.text.substring(0, 300) : post.text}
            .....
          </p>
        </div>
      </Link>
      <div className='statistic'>
        <div className='item'>
          <i className='far fa-eye'></i> <span>{post.viewer.length}</span>
        </div>
        <div className='item'>
          <i className='far fa-thumbs-up'></i> <span>{post.like.length}</span>
        </div>
        <div className='item'>
          <i className='far fa-thumbs-down'></i>{' '}
          <span>{post.dislike.length}</span>
        </div>
        <div className='item'>
          <i className='far fa-comment'></i> <span>{post.comment.length}</span>
        </div>
        <div className='item'>
          {auth && auth.user && auth.user._id === post.user && (
            <Fragment>
              <Link to={{ pathname: '/edit-post', post }}>
                <i className='far fa-edit fa-lg'></i>
              </Link>
              <Modal
                title={`Detele ${post.title}`}
                content={`Are you sure want to delete ${post.title}?`}
                danger
                submit='Delete'
                submitData={() => deletePost(post._id)}
              >
                <i className='far fa-trash-alt fa-lg'></i>
              </Modal>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  deletePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost })(styled(Post)`
  position: relative;
  background-color: ${setColor.mainWhite};
  box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 2%;
  margin-bottom: 2%;
  .content {
    display: grid;
    color: ${setColor.mainBlack};
    grid-template-areas:
      'img title'
      'img text';
    grid-template-rows: 40px;
    align-items: center;
    justify-content: start;
    column-gap: 20px;
    img {
      grid-area: img;
      width: 150px;
      height: 150px;
      border: 1px solid ${setColor.mainBlack};
    }
    h4 {
      grid-area: title;
      &:hover {
        text-decoration: underline;
      }
    }
    p {
      grid-area: text;
    }
  }
  .statistic {
    ${setFlex({ x: 'space-between', y: 'flex-end' })};
    height: 30px;
    width: 280px;
    color: ${setColor.darkBlue};
    .item:last-child {
      cursor: pointer;
      width: 100px;
      margin-right: 10px;
      i.fa-edit {
        color: ${setColor.darkBlue};
        &:hover {
          color: ${setColor.mainBlue};
        }
      }
      i.fa-trash-alt {
        color: ${setColor.dangerColor};
        margin-left: 10px;
        &:hover {
          color: ${setColor.mainRed};
        }
      }
    }
  }
`);
