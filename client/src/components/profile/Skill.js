import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setColor } from '../../styles';

const Skill = ({ className, skills, auth: { user }, profile }) => (
  <div className={className}>
    {user && profile && profile.user._id === user._id && (
      <i className='far fa-edit'></i>
    )}
    <h3>Skills</h3>
    {skills &&
      skills.map((skill, index) => (
        <div className='skill' key={index}>
          <h4>{skill}</h4>
          <div className='line' />
        </div>
      ))}
  </div>
);

Skill.propTypes = {
  skills: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  skills: state.profile.profile.skills,
  auth: state.auth,
  profile: state.profile.profile,
});

export default connect(mapStateToProps)(styled(Skill)`
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
  .skill {
    margin: 5px 0;
    text-align: left;
    h4 {
      font-weight: 400;
      color: ${setColor.mainBlack};
      margin: 5px 20px;
    }
    .line {
      border: 1px solid ${setColor.mainGray};
      margin: 5px 0;
    }
  }
`);
