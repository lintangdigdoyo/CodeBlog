import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { setColor } from '../../styles';
import Modal from '../globals/Modal';
import AddEducation from './AddEducation';

const Education = ({ className, education, profile, auth: { user } }) => (
  <div className={className}>
    {user && profile && profile.user._id === user._id && (
      <Modal title='Add Education' body={<AddEducation />}>
        <i className='fas fa-plus-circle'></i>
      </Modal>
    )}
    <h3>Educations</h3>
    {education &&
      education.map((education) => (
        <div className='education' key={education._id}>
          {user && profile && profile.user._id === user._id && (
            <Modal title='Edit Education' body='test'>
              <i className='far fa-edit'></i>
            </Modal>
          )}
          <h4>{education.school}</h4>
          <h5>{education.degree && education.degree}</h5>
          <div className='date'>
            {education.start && (
              <Moment format='YYYY'>{education.start}</Moment>
            )}
            {education.start && (education.end || education.current) && ' - '}
            {education.end && <Moment format='YYYY'>{education.end}</Moment>}
            {education.current && 'Now'}
          </div>
          <div className='line' />
        </div>
      ))}
  </div>
);

Education.propTypes = {
  education: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  education: state.profile.profile.education,
  profile: state.profile.profile,
  auth: state.auth,
});

export default connect(mapStateToProps)(styled(Education)`
  position: relative;
  background-color: ${setColor.mainWhite};
  text-align: center;
  box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 5%;
  h3 {
    color: ${setColor.darkBlue};
    margin-bottom: 40px;
  }
  i {
    position: absolute;
    right: 10%;
    top: 10%;
    font-size: 20px;
    color: ${setColor.darkBlue};
    cursor: pointer;
    &:hover {
      color: ${setColor.mainBlue};
      transition: 0.3s ease-in-out;
    }
  }
  .education {
    margin: 10px 0;
    text-align: left;
    position: relative;
    margin-bottom: 10%;
    h4,
    h5 {
      font-weight: 400;
      color: ${setColor.mainBlack};
      margin: 5px 20px;
    }
    i {
      position: absolute;
      right: 5%;
      font-size: 20px;
      color: ${setColor.darkBlue};
      cursor: pointer;
      &:hover {
        color: ${setColor.mainBlue};
        transition: 0.3s ease-in-out;
      }
    }
    .date {
      color: ${setColor.darkGray};
      margin: 5px 20px;
    }
    .line {
      border: 1px solid ${setColor.mainGray};
      margin: 10px 0;
    }
  }
`);
