import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SmallButton } from '../globals/Button';
import { setColor } from '../../styles';
import Avatar from '../globals/Avatar';
import { createProfile } from '../actions/profile';
import { removeAlert } from '../actions/alert';
import Alert from '../globals/Alert';

const ProfileForm = ({ className, createProfile, removeAlert, alerts }) => {
  const [formData, setFormData] = useState({
    country: '',
    location: '',
    status: '',
    website: '',
    skills: '',
    bio: '',
  });
  const [file, setFile] = useState();

  const { country, location, status, website, skills, bio } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    removeAlert();
    createProfile(formData, file);
  };

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className='upload-avatar'>
        <label htmlFor='avatar'>Upload Photo</label>
        <Avatar />
        <input
          className='input-upload'
          type='file'
          id='avatar'
          name='avatar'
          onChange={(e) => {
            const file = e.target.files[0];
            setFile(file);
          }}
          accept='image/*'
        />
      </div>
      <div className='item'>
        <label htmlFor='country'>
          Country/region <span>*</span>
        </label>
        <input
          type='text'
          name='country'
          id='country'
          placeholder='Country or region you are living'
          value={country}
          onChange={onChange}
          required
        />
      </div>
      <div className='item'>
        <label htmlFor='location'>Location</label>
        <input
          type='text'
          name='location'
          id='location'
          placeholder='Location in the country you are living'
          value={location}
          onChange={onChange}
        />
      </div>
      <div className='item'>
        <label htmlFor='status'>
          Professional Status <span>*</span>
        </label>
        <input
          type='text'
          placeholder='Give us an idea of where you are at in your career (eg. Senior Developer, Front-End Developer )'
          name='status'
          id='status'
          value={status}
          onChange={onChange}
          required
        />
      </div>
      <div className='item'>
        <label htmlFor='website'>Website</label>
        <input
          type='text'
          placeholder='Could be your own or a company website'
          name='website'
          id='website'
          value={website}
          onChange={onChange}
        />
      </div>
      <div className='item'>
        <label htmlFor='skills'>
          Skills <span>*</span>
        </label>
        <input
          type='text'
          placeholder='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)'
          name='skills'
          id='skills'
          value={skills}
          onChange={onChange}
          required
        />
      </div>
      <div className='item'>
        <label htmlFor='bio'>Bio</label>
        <textarea
          rows='4'
          cols='50'
          placeholder='Tell us a little about yourself'
          name='bio'
          id='bio'
          value={bio}
          onChange={onChange}
        />
      </div>
      <SmallButton>Submit</SmallButton>
      <Alert />
    </form>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { createProfile, removeAlert })(styled(
  ProfileForm
)`
  .input-upload {
    border: none;
    cursor: pointer;
  }
  .upload-avatar {
    display: grid;
    align-items: center;
  }
  img {
    height: 100px;
    width: 100px;
    margin: 10px;
  }
  button {
    height: 40px;
  }
  label {
    display: block;
    color: ${setColor.darkBlue};
    font-weight: 600;
  }
  input,
  textarea {
    border: 1px solid ${setColor.mainBlue};
    width: 70%;
    margin-bottom: 10px;
    line-height: 25px;
    padding: 5px;
  }
`);
