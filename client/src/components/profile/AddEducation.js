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
  profile,
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
      if (
        profile.error &&
        alerts.length !== 0 &&
        alerts[0].alertType === 'danger'
      ) {
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
  }, [removeAlert, setFormData, profile.error]);

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
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
  profile: state.profile,
});

export default connect(mapStateToProps, { removeAlert })(AddEducation);
