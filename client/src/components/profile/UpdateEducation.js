import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeAlert } from '../actions/alert';
import EducationForm from './EducationForm';

const UpdateEducation = ({
  formData,
  setFormData,
  onChange,
  removeAlert,
  alerts,
  education,
}) => {
  useEffect(() => {
    if (alerts.length !== 0 && alerts[0].alertType === 'success') {
      alerts.length !== 0 && removeAlert();
    }
    setFormData({
      school: education.school,
      degree: education.degree,
      startYear: education.startYear,
      endYear: education.endYear,
      current: education.current,
    });
    return () => {
      if (alerts.length !== 0 && alerts[0].alertType === 'danger') {
        removeAlert();
      }
    };
  }, [removeAlert, alerts, setFormData]);

  return (
    <EducationForm
      formData={formData}
      onChange={onChange}
      setFormData={setFormData}
    />
  );
};

UpdateEducation.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { removeAlert })(UpdateEducation);
