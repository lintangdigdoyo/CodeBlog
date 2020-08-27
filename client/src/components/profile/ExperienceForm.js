import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setColor } from '../../styles';
import Alert from '../globals/Alert';

const ExperienceForm = ({
  className,
  formData,
  onChange,
  setFormData,
  alerts,
}) => {
  const { job, company, location, start, end, current } = formData;

  let alertName = [];
  if (alerts.length > 0 && alerts[0].alertType === 'danger') {
    alertName = alerts.map((alert) => alert.name);
  }

  return (
    <div className={className}>
      <Alert />
      <label htmlFor='job-title'>
        Job Title <span>*</span>
      </label>
      <input
        type='text'
        name='job'
        id='job-title'
        placeholder='Enter your job title'
        className={
          alertName.filter((alert) => alert === 'job').toString() && 'danger'
        }
        value={job}
        onChange={onChange}
      />
      <label htmlFor='company'>
        Company <span>*</span>
      </label>
      <input
        type='text'
        name='company'
        id='company'
        placeholder='Enter your company'
        className={
          alertName.filter((alert) => alert === 'company').toString() &&
          'danger'
        }
        value={company}
        onChange={onChange}
      />
      <label htmlFor='Location'>
        Location <span>*</span>
      </label>
      <input
        type='text'
        name='location'
        id='location'
        placeholder='Enter your job location'
        className={
          alertName.filter((alert) => alert === 'location').toString() &&
          'danger'
        }
        value={location}
        onChange={onChange}
      />
      <label htmlFor='start'>Start Date</label>
      <input
        type='date'
        name='start'
        id='start'
        value={start}
        onChange={onChange}
      />
      <label htmlFor='end'>End Date</label>
      <input
        type='checkbox'
        name='current'
        value={current}
        checked={current}
        onChange={() => {
          setFormData({ ...formData, current: !current, end: '' });
        }}
      />{' '}
      Current
      <input
        type='date'
        name='end'
        id='end'
        disabled={current}
        value={end}
        onChange={onChange}
      />
    </div>
  );
};

ExperienceForm.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(styled(ExperienceForm)`
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
  input.danger {
    border-color: ${setColor.mainRed};
    &::placeholder {
      color: ${setColor.dangerColor};
    }
  }
  span {
    color: ${setColor.mainRed};
  }
  input[type='date'] {
    display: block;
    cursor: pointer;
  }
  input[type='checkbox'] {
    width: 0;
    cursor: pointer;
  }
`);
