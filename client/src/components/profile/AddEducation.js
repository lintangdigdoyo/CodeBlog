import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setColor } from '../../styles';

const AddEducation = ({ className, formData, setFormData, onChange }) => {
  const firstYear = 1980;
  const yearNow = new Date().getFullYear();
  const yearCount = yearNow - firstYear + 1;
  const years = Array.from(
    new Array(yearCount),
    (val, index) => yearNow - index
  );

  const { school, degree, startYear, endYear, current } = formData;

  return (
    <div className={className}>
      <label htmlFor='school'>
        School <span>*</span>
      </label>
      <input
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
          className='start-year'
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
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <label htmlFor='end-year'>End Year</label>
      <input
        type='checkbox'
        name='current'
        value={current}
        checked={current}
        onChange={() => setFormData({ ...formData, current: !current })}
      />{' '}
      Current
      <div className='select'>
        <select
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

AddEducation.propTypes = {};

export default styled(AddEducation)`
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

  input[type='checkbox'] {
    width: 0;
    cursor: pointer;
  }
`;
