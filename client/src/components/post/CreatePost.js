import React from 'react';
import styled from 'styled-components';

import { setColor } from '../../styles';
import PostForm from './PostForm';

const CreatePost = ({ className }) => {
  return (
    <div className={className}>
      <h1>Create a new post</h1>
      <PostForm />
    </div>
  );
};

export default styled(CreatePost)`
  margin: 5% 0;
  color: ${setColor.darkBlue};
  h1 {
    background-color: ${setColor.mainWhite};
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
    padding: 2%;
    font-weight: 600;
  }
`;
