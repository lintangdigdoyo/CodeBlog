import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ExperienceForm from './ExperienceForm';
import { removeAlert } from '../../actions/alert';

const AddExperience = ({
  formData,
  onChange,
  setFormData,
  removeAlert,
  alerts,
  profile,
}) => {
  useEffect(() => {
    if (alerts.length !== 0 && alerts[0].alertType === 'success') {
      alerts.length !== 0 && removeAlert();
    }
    setFormData({
      job: '',
      company: '',
      location: '',
      start: '',
      end: '',
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
        job: '',
        company: '',
        location: '',
        start: '',
        end: '',
        current: false,
      });
    };
  }, [setFormData, removeAlert, profile.error]);

  return (
    <ExperienceForm
      formData={formData}
      onChange={onChange}
      setFormData={setFormData}
    />
  );
};

AddExperience.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
  profile: state.profile,
});

export default connect(mapStateToProps, { removeAlert })(AddExperience);
