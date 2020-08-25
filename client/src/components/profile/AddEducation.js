import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setColor } from '../../styles';

const AddEducation = ({ className }) => {
  const firstYear = 1980;
  const yearNow = new Date().getFullYear();
  const yearCount = yearNow - firstYear + 1;
  const years = Array.from(
    new Array(yearCount),
    (val, index) => yearNow - index
  );

  console.log(years);

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
      />
      <label htmlFor='degree'>Degree</label>
      <input
        type='text'
        name='degree'
        id='degree'
        placeholder='Enter your degree'
      />
      <label htmlFor='start-year'>
        Start Year <span>*</span>
      </label>
      <select name='start-year' id='start-year'>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>

      <label htmlFor='country'>
        School <span>*</span>
      </label>
      <input
        type='text'
        name='country'
        id='country'
        placeholder='Country or region you are living'
      />
      <label htmlFor='country'>
        School <span>*</span>
      </label>
      <input
        type='text'
        name='country'
        id='country'
        placeholder='Country or region you are living'
      />
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
  select {
    width: 20%;
    padding: 5px;
  }
`;
