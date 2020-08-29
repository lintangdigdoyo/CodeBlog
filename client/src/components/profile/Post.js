import React from 'react';
import styled from 'styled-components';

import { setColor } from '../../styles';

const Post = ({ className, post }) => {
  return <div className={className}>{post.title}</div>;
};

export default styled(Post)`
  position: relative;
  background-color: ${setColor.mainWhite};
  box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 5%;
  margin-bottom: 2%;
`;
