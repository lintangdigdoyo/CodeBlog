import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PageNotFound } from './pageNotFound.svg';

import { setColor, setRem } from '../../styles';

const NotFound = ({ className }) => {
  return (
    <div className={className}>
      <PageNotFound />
      <p>Page Not Found</p>
    </div>
  );
};

export default styled(NotFound)`
  min-height: 100vh;
  margin: 5%;
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  grid-template-rows: 500px 55px;
  p {
    color: ${setColor.darkBlue};
    font-size: ${setRem(48)};
    font-weight: 600;
  }
`;
