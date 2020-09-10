import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeAlert } from '../../actions/alert';
import ExperienceForm from './ExperienceForm';

const UpdateExperience = ({
  formData,
  setFormData,
  onChange,
  removeAlert,
  alerts,
  experience,
}) => {
  useEffect(() => {
    if (alerts.length !== 0 && alerts[0].alertType === 'success') {
      alerts.length !== 0 && removeAlert();
    }

    //Format start date
    const startDate = new Date(experience.start);
    const yearStart = startDate.getFullYear();
    const monthStart = startDate.getMonth() + 1;
    const dateStart = startDate.getDate();
    const formatedMonthStart = monthStart < 10 ? `0${monthStart}` : monthStart;
    const formatedDateStart = dateStart < 10 ? `0${dateStart}` : dateStart;
    //format end date
    const endDate = new Date(experience.end);
    const yearEnd = endDate.getFullYear();
    const monthEnd = endDate.getMonth() + 1;
    const dateEnd = endDate.getDate();
    const formatedMonthEnd = monthEnd < 10 ? `0${monthEnd}` : monthEnd;
    const formatedDateEnd = dateEnd < 10 ? `0${dateEnd}` : dateEnd;

    setFormData({
      job: experience.job,
      company: experience.company,
      location: experience.location,
      start: `${yearStart}-${formatedMonthStart}-${formatedDateStart}`,
      end: `${yearEnd}-${formatedMonthEnd}-${formatedDateEnd}`,
      current: experience.current,
    });
    return () => {
      if (alerts.length !== 0 && alerts[0].alertType === 'danger') {
        removeAlert();
      }
    };
  }, [removeAlert, alerts, setFormData]);

  return (
    <ExperienceForm
      formData={formData}
      onChange={onChange}
      setFormData={setFormData}
    />
  );
};

UpdateExperience.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { removeAlert })(UpdateExperience);
