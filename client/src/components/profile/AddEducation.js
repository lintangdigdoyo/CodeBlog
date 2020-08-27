import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeAlert } from '../actions/alert';
import EducationForm from './EducationForm';

const AddEducation = ({
  formData,
  setFormData,
  onChange,
  removeAlert,
  alerts,
}) => {
  useEffect(() => {
    if (alerts.length !== 0 && alerts[0].alertType === 'success') {
      alerts.length !== 0 && removeAlert();
    }
    setFormData({
      school: '',
      degree: '',
      startYear: '',
      endYear: '',
      current: false,
    });

    return () => {
      if (alerts.length !== 0 && alerts[0].alertType === 'danger') {
        removeAlert();
      }
      setFormData({
        school: '',
        degree: '',
        startYear: '',
        endYear: '',
        current: false,
      });
    };
  }, [removeAlert, setFormData, alerts]);

  return (
    <EducationForm
      formData={formData}
      onChange={onChange}
      setFormData={setFormData}
    />
  );
};

AddEducation.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { removeAlert })(AddEducation);