import React from 'react';
import styled from 'styled-components';

const Posts = ({ className }) => {
  return <div className={className}>Hello from posts</div>;
};

export default styled(Posts)`
  border: 1px solid black;
`;
