import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { setColor } from '../../styles';
import Alert from '../globals/Alert';
import { removeAlert } from '../../actions/alert';

const UpdateSkill = ({
  className,
  formData: { skills },
  onChange,
  removeAlert,
  formData,
  setFormData,
  skill,
  alerts,
}) => {
  useEffect(() => {
    if (alerts.length !== 0 && alerts[0].alertType === 'success') {
      alerts.length !== 0 && removeAlert();
    }
    setFormData({ ...formData, skills: skill.toString() });
    return () => {
      if (alerts.length !== 0 && alerts[0].alertType === 'danger') {
        removeAlert();
      }
    };
  }, [setFormData, removeAlert, alerts]);

  return (
    <div className={className}>
      <Alert />
      <label htmlFor='skills'>
        Skills <span>*</span>
      </label>
      <input
        type='text'
        id='skills'
        name='skills'
        value={skills}
        onChange={onChange}
        placeholde='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)'
      />
    </div>
  );
};

UpdateSkill.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { removeAlert })(styled(UpdateSkill)`
  label {
    display: block;
    color: ${setColor.darkBlue};
    font-weight: 600;
  }
  input {
    border: 1px solid ${setColor.mainBlue};
    width: 70%;
    margin-bottom: 10px;
    line-height: 25px;
    padding: 5px;
  }

  input.danger,
  select.danger {
    border-color: ${setColor.mainRed};
    &::placeholder {
      color: ${setColor.dangerColor};
    }
  }

  span {
    color: ${setColor.mainRed};
  }
  .select {
    position: relative;
    height: 40px;
    .start-year {
      z-index: 5;
    }
    .end-year {
      z-index: 4;
    }
  }
  select {
    border: 1px solid ${setColor.mainBlue};
    position: absolute;
    display: block;
    width: 20%;
    padding: 5px;
    margin-bottom: 10px;
    cursor: pointer;
  }
`);
