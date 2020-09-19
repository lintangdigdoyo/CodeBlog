import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { setColor } from '../../styles';
import Alert from '../globals/Alert';

const EducationForm = ({
  className,
  formData,
  setFormData,
  onChange,
  alerts,
}) => {
  const { school, degree, startYear, endYear, current } = formData;

  const firstYear = 1980;
  const yearNow = new Date().getFullYear();
  const yearCount = yearNow - firstYear + 1;
  const years = Array.from(
    new Array(yearCount),
    (val, index) => yearNow - index
  );

  let alertName = [];
  if (alerts.length > 0 && alerts[0].alertType === 'danger') {
    alertName = alerts.map((alert) => alert.name);
  }

  return (
    <div className={className}>
      <Alert />
      <label htmlFor='school'>
        School <span>*</span>
      </label>
      <input
        className={
          alertName.filter((alert) => alert === 'school').toString() && 'danger'
        }
        type='text'
        name='school'
        id='school'
        placeholder='Enter your school name'
        value={school}
        onChange={onChange}
      />
      <label htmlFor='degree'>Degree</label>
      <input
        type='text'
        name='degree'
        id='degree'
        placeholder='Enter your degree'
        value={degree}
        onChange={onChange}
      />
      <label htmlFor='start-year'>
        Start Year <span>*</span>
      </label>
      <div className='select'>
        <select
          className={
            alertName.filter((alert) => alert === 'startYear').toString() &&
            'danger'
          }
          name='startYear'
          id='start-year'
          onMouseDown={(e) => {
            e.target.size = 5;
          }}
          onChange={(e) => {
            e.target.size = 0;
            setFormData({ ...formData, startYear: e.target.value });
          }}
          onBlur={(e) => (e.target.size = 0)}
          value={startYear}
        >
          <option value=''>select start year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <label htmlFor='end-year'>End Year</label>
      <div className='checkbox-current'>
        <input
          type='checkbox'
          name='current'
          value={current}
          checked={current}
          onChange={() =>
            setFormData({ ...formData, current: !current, endYear: '' })
          }
        />{' '}
        <div className='current'>Current</div>
      </div>

      <div className='select'>
        <select
          disabled={current}
          className='end-year'
          name='endYear'
          id='end-year'
          onMouseDown={(e) => {
            e.target.size = 5;
          }}
          onChange={(e) => {
            e.target.size = 0;
            setFormData({ ...formData, endYear: e.target.value });
          }}
          onBlur={(e) => (e.target.size = 0)}
          value={endYear}
        >
          <option value=''>select end year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

EducationForm.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(styled(EducationForm)`
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
    select#start-year {
      z-index: 5;
    }
    select#end-year {
      z-index: 2;
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
  .checkbox-current {
    display: flex;
    align-items: center;
    width: 7%;
    input[type='checkbox'] {
      cursor: pointer;
      margin: 5%;
    }
    .current {
      color: ${setColor.mainBlack};
    }
  }
`);
