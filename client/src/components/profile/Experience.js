import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { setColor } from '../../styles';

const Experience = ({ className, experience, auth: { user }, profile }) => (
  <div className={className}>
    {user && profile && profile.user._id === user._id && (
      <i className='fas fa-plus-circle'></i>
    )}

    <h3>Experiences</h3>
    {experience &&
      experience.map((experience) => (
        <div className='experience' key={experience._id}>
          {user && profile && profile.user._id === user._id && (
            <i className='far fa-edit'></i>
          )}

          <h4>{experience.job}</h4>
          <h5>
            {experience.company && experience.company}{' '}
            {experience.location && experience.location}
          </h5>
          <div className='date'>
            {experience.start && (
              <Moment format='YYYY'>{experience.start}</Moment>
            )}
            {experience.start &&
              (experience.end || experience.current) &&
              ' - '}
            {experience.end && (
              <Moment format='YYYY/MM/DD'>{experience.end}</Moment>
            )}
            {experience.current && 'Now'}
          </div>
          <div className='line' />
        </div>
      ))}
  </div>
);

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  experience: state.profile.profile.experience,
  profile: state.profile.profile,
  auth: state.auth,
});

export default connect(mapStateToProps)(styled(Experience)`
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
  .experience {
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
