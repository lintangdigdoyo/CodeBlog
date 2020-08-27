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
  const [imagePreviewUrl, setImagePreviewUrl] = useState();

  const { country, location, status, website, skills, bio } = formData;

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onUploadChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    removeAlert();
    createProfile(formData, file);
  };

  const alertName = alerts.map((alert) => alert.name);

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className='upload-avatar'>
        <label htmlFor='avatar'>Upload Photo</label>
        <Avatar src={imagePreviewUrl} />
        <input
          className='input-upload'
          type='file'
          id='avatar'
          name='avatar'
          onChange={onUploadChange}
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
          className={
            alertName.filter((alert) => alert === 'country').toString() &&
            'danger'
          }
          value={country}
          onChange={onFormChange}
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
          onChange={onFormChange}
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
          className={
            alertName.filter((alert) => alert === 'status').toString() &&
            'danger'
          }
          value={status}
          onChange={onFormChange}
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
          onChange={onFormChange}
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
          className={
            alertName.filter((alert) => alert === 'skills').toString() &&
            'danger'
          }
          value={skills}
          onChange={onFormChange}
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
          onChange={onFormChange}
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

export default connect(mapStateToProps, { createProfile, removeAlert })(
  styled(ProfileForm)`
    input.danger {
      border: 2px solid ${setColor.mainRed};
      &::placeholder {
        color: ${setColor.dangerColor};
      }
    }
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
  `
);
