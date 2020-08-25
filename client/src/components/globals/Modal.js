import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { setColor } from '../../styles';

function reducer(state, action) {
  switch (action.type) {
    case 'close':
      return { open: false };
    case 'open':
      return { open: true, size: action.size };
    default:
      throw new Error('Unsupported action...');
  }
}

const ModalComponent = ({
  children,
  className,
  title,
  body,
  submit,
  cancel,
  danger,
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  return (
    <div className={className}>
      <Button onClick={() => dispatch({ type: 'open', size: 'large' })}>
        {children}
      </Button>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content>{body}</Modal.Content>
        <Modal.Actions>
          <Button onClick={() => dispatch({ type: 'close' })}>
            {cancel || 'Cancel'}
          </Button>
          <Button
            style={{
              background: `${
                danger ? setColor.dangerColor : setColor.darkBlue
              }`,
              color: `${setColor.mainWhite}`,
            }}
            onClick={() => dispatch({ type: 'close' })}
          >
            {submit || 'Submit'}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default styled(ModalComponent)`
  padding: 0;
  margin: 0;
  display: inline;
  .ui.button {
    margin: 0;
    padding: 0;
    margin-left: 10px;
    background: none;
  }
`;
