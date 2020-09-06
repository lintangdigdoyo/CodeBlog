import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { setColor, setRem } from '../../styles';

const Alert = ({ alerts, className }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert, index) => (
    <div key={index} className={className}>
      <div className={alert.alertType}>{alert.msg}</div>
    </div>
  ));

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

Alert.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      msg: PropTypes.string.isRequired,
      alertType: PropTypes.string.isRequired,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default connect(mapStateToProps)(styled(Alert)`
  margin: 5px 0;
  font-size: ${setRem(18)};
  .danger {
    color: ${setColor.dangerColor};
    background-color: ${setColor.lightDanger};
    padding: 5px;
  }
  .success {
    color: ${setColor.mainGreen};
    background-color: ${setColor.successColor};
    padding: 5px;
    position: absolute;
    width: 100vw;
    top: 0;
    left: 0;
    text-align: center;
    opacity: 0.8;
  }
`);
