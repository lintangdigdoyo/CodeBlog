import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { setColor } from '../../styles';
import PostForm from './PostForm';

const EditPost = ({ className, history, location: { post } }) => {
  if (!post) {
    return <Redirect to='/' />;
  }

  return (
    <div className={className}>
      <h1>Edit Post</h1>
      <PostForm history={history} post={post} />
    </div>
  );
};

export default styled(EditPost)`
  margin: 5% 0;
  color: ${setColor.darkBlue};
  h1 {
    background-color: ${setColor.mainWhite};
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
    padding: 2%;
    font-weight: 600;
  }
`;
