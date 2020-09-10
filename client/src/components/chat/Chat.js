import React from 'react';
import styled from 'styled-components';

const Chat = ({ className }) => {
  return <div className={className}>Hello from chat</div>;
};

export default styled(Chat)`
  margin: 5% 0;
`;
