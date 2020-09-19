import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setColor } from '../../styles';
import Modal from '../globals/Modal';
import UpdateSkill from './UpdateSkill';
import { updateSkill } from '../../actions/profile';

const Skill = ({ className, skills, auth: { user }, profile, updateSkill }) => {
  const [formData, setFormData] = useState({
    name: user && user.name,
    country: profile.country,
    status: profile.status,
    skills: profile.skills,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className={className}>
      {user && profile && profile.user._id === user._id && (
        <Modal
          title='Edit Skill'
          submit='Save'
          submitData={() => updateSkill(formData, user._id)}
          content={
            <UpdateSkill
              formData={formData}
              onChange={onChange}
              skill={profile.skills}
              setFormData={setFormData}
            />
          }
        >
          <i className='far fa-edit'></i>
        </Modal>
      )}
      <h3>Skills</h3>
      {skills &&
        skills.map(
          (skill, index) =>
            skill !== '' && (
              <div className='skill' key={index}>
                <h4>{skill}</h4>
                <div className='line' />
              </div>
            )
        )}
    </div>
  );
};

Skill.propTypes = {
  skills: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  updateSkill: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  skills: state.profile.profile.skills,
  auth: state.auth,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { updateSkill })(styled(Skill)`
  position: relative;
  background-color: ${setColor.mainWhite};
  text-align: center;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
  padding: 5%;
  padding-bottom: 10%;
  h3 {
    color: ${setColor.darkBlue};
    margin-bottom: 40px;
    margin-top: 0;
  }
  i {
    position: absolute;
    right: 10%;
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
      text-transform: uppercase;
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
