import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setColor } from '../../styles';
import Modal from '../globals/Modal';
import {
  addEducation,
  deleteEducation,
  updateEducation,
} from '../../actions/profile';
import AddEducation from './AddEducation';
import UpdateEducation from './UpdateEducation';

const Education = ({
  className,
  education,
  profile,
  auth: { user },
  addEducation,
  deleteEducation,
  updateEducation,
}) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    startYear: '',
    endYear: '',
    current: false,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className={className}>
      {user && profile && profile.user._id === user._id && (
        <Modal
          title='Add Education'
          submitData={() => addEducation(formData, user._id)}
          content={
            <AddEducation
              formData={formData}
              onChange={onChange}
              setFormData={setFormData}
            />
          }
        >
          <i className='fas fa-plus-circle'></i>
        </Modal>
      )}
      <h3>Educations</h3>
      {education &&
        education.map((education) => (
          <div className='education' key={education._id}>
            {user && profile && profile.user._id === user._id && (
              <Fragment>
                <Modal
                  title={`Delete ${education.school}`}
                  content={`Are you sure want to delete ${education.school}?`}
                  submitData={() =>
                    deleteEducation(profile.user._id, education._id)
                  }
                  danger
                  submit='Delete'
                >
                  <i className='far fa-trash-alt'></i>
                </Modal>
                <Modal
                  title='Edit Education'
                  submit='Save'
                  submitData={() =>
                    updateEducation(formData, profile.user._id, education._id)
                  }
                  content={
                    <UpdateEducation
                      formData={formData}
                      education={education}
                      onChange={onChange}
                      setFormData={setFormData}
                    />
                  }
                >
                  <i className='far fa-edit'></i>
                </Modal>
              </Fragment>
            )}
            <h4>{education.school}</h4>
            <h5>{education.degree && education.degree}</h5>
            <div className='date'>
              {education.startYear && education.startYear}
              {education.startYear &&
                (education.endYear || education.current) &&
                ' - '}
              {education.endYear && education.endYear}
              {education.current && 'Now'}
            </div>
            <div className='line' />
          </div>
        ))}
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  updateEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  education: state.profile.profile.education,
  profile: state.profile.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addEducation,
  deleteEducation,
  updateEducation,
})(styled(Education)`
  position: relative;
  background-color: ${setColor.mainWhite};
  text-align: center;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
  padding: 5%;
  padding-bottom: 10%;
  width: 360px;
  h3 {
    color: ${setColor.darkBlue};
    margin-bottom: 20px;
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
  .education {
    text-align: left;
    position: relative;
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
