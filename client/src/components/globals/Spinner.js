import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import styled from 'styled-components';

const Spinner = ({ className }) => {
  return (
    <div className={className}>
      <Dimmer active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>
    </div>
  );
};

export default styled(Spinner)`
  height: 100vh;
  width: 100vh;
`;
