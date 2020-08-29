import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { setColor } from '../../styles';
import Modal from '../globals/Modal';
import AddExperience from './AddExperience';
import {
  addExperience,
  deleteExperience,
  updateExperience,
} from '../actions/profile';
import UpdateExperience from './UpdateExperience';

const Experience = ({
  className,
  experience,
  auth: { user },
  profile,
  addExperience,
  deleteExperience,
  updateExperience,
}) => {
  const [formData, setFormData] = useState({
    job: '',
    company: '',
    location: '',
    start: '',
    end: '',
    current: false,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className={className}>
      {user && profile && profile.user._id === user._id && (
        <Modal
          title='Add Experience'
          submitData={() => addExperience(formData, profile.user._id)}
          content={
            <AddExperience
              onChange={onChange}
              formData={formData}
              setFormData={setFormData}
            />
          }
        >
          <i className='fas fa-plus-circle'></i>
        </Modal>
      )}

      <h3>Experiences</h3>
      {experience &&
        experience.map((experience) => (
          <div className='experience' key={experience._id}>
            {user && profile && profile.user._id === user._id && (
              <Fragment>
                <Modal
                  title={`Delete ${experience.job}`}
                  content={`Are you sure want to delete ${experience.job}?`}
                  submitData={() =>
                    deleteExperience(profile.user._id, experience._id)
                  }
                  danger
                  submit='Delete'
                >
                  <i className='far fa-trash-alt'></i>
                </Modal>
                <Modal
                  title='Edit Experience'
                  submit='Save'
                  submitData={() =>
                    updateExperience(formData, profile.user._id, experience._id)
                  }
                  content={
                    <UpdateExperience
                      formData={formData}
                      experience={experience}
                      onChange={onChange}
                      setFormData={setFormData}
                    />
                  }
                >
                  <i className='far fa-edit'></i>
                </Modal>
              </Fragment>
            )}

            <h4>{experience.job}</h4>
            <h5>
              {experience.company && experience.company}{' '}
              {experience.location && experience.location}
            </h5>
            <div className='date'>
              {experience.start && (
                <Moment format='MMMM Do YYYY'>{experience.start}</Moment>
              )}
              {experience.start &&
                (experience.end || experience.current) &&
                ' - '}
              {experience.end && (
                <Moment format='MMMM Do YYYY'>{experience.end}</Moment>
              )}
              {experience.current && 'Now'}
            </div>
            <div className='line' />
          </div>
        ))}
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  updateExperience: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  experience: state.profile.profile.experience,
  profile: state.profile.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addExperience,
  deleteExperience,
  updateExperience,
})(styled(Experience)`
  position: relative;
  background-color: ${setColor.mainWhite};
  text-align: center;
  box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
  padding: 5%;
  width: 360px;
  h3 {
    color: ${setColor.darkBlue};
    margin: 0;
    margin-bottom: 40px;
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
    i.fa-trash-alt {
      right: 17%;
      color: ${setColor.dangerColor};
      &:hover {
        color: ${setColor.mainRed};
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
