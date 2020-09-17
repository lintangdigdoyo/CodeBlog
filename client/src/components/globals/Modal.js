import React, { useEffect } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setColor } from '../../styles';
import { removeAlert } from '../../actions/alert';

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
  content,
  submit,
  cancel,
  danger,
  submitData,
  alerts,
  removeAlert,
  scroll,
}) => {
  const [state, dispatch] = React.useReducer(reducer, {
    open: false,
    size: undefined,
  });

  const { open, size } = state;

  useEffect(() => {
    if (alerts.length !== 0 && alerts[0].alertType === 'success') {
      dispatch({ type: 'close' });
    }
  }, [alerts]);

  const onSubmit = async (e) => {
    e.preventDefault();
    removeAlert();
    submitData();
  };

  return (
    <div className={className}>
      <Button onClick={() => dispatch({ type: 'open', size: 'large' })}>
        {children}
      </Button>
      <Modal
        as='form'
        size={size}
        open={open}
        onClose={() => dispatch({ type: 'close' })}
      >
        <Modal.Header
          style={{
            backgroundColor: danger ? setColor.dangerColor : setColor.mainBlue,
            color: setColor.mainWhite,
          }}
        >
          {title}
        </Modal.Header>
        <Modal.Content scrolling={false || scroll}>{content}</Modal.Content>
        <Modal.Actions>
          <Button onClick={() => dispatch({ type: 'close' })}>
            {cancel || 'Cancel'}
          </Button>
          <Button
            type='submit'
            style={{
              background: danger ? setColor.mainRed : setColor.mainBlue,
              color: setColor.mainWhite,
            }}
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            {submit || 'Submit'}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

ModalComponent.propTypes = {
  alerts: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { removeAlert })(styled(ModalComponent)`
  padding: 0;
  margin: 0;
  display: inline;
  .ui.button {
    margin: 0;
    padding: 0;
    margin-left: 10px;
    background: none;
  }
`);
