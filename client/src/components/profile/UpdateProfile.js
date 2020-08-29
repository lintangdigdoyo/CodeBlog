import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { removeAlert } from '../actions/alert';
import Avatar from '../globals/Avatar';
import Alert from '../globals/Alert';
import { setColor } from '../../styles';

const UpdateProfile = ({
  removeAlert,
  alerts,
  className,
  formData,
  setFormData,
  profile,
  onUploadChange,
  onFormChange,
  imagePreviewUrl,
}) => {
  useEffect(() => {
    if (alerts.length !== 0 && alerts[0].alertType === 'success') {
      alerts.length !== 0 && removeAlert();
    }
    setFormData({
      country: profile.country,
      location: profile.location ? profile.location : '',
      status: profile.status,
      website: profile.website ? profile.website : '',
      skills: profile.skills,
      bio: profile.bio ? profile.bio : '',
      name: profile.user.name,
    });

    return () => {
      if (alerts.length !== 0 && alerts[0].alertType === 'danger') {
        removeAlert();
      }
      setFormData({
        country: profile.country,
        location: profile.location ? profile.location : '',
        status: profile.status,
        website: profile.website ? profile.website : '',
        skills: profile.skills,
        bio: profile.bio ? profile.bio : '',
        name: profile.user.name,
      });
    };
  }, [removeAlert, setFormData, alerts]);

  const { country, location, status, website, bio, name } = formData;

  const alertName = alerts.map((alert) => alert.name);

  return (
    <div className={className}>
      <Alert />
      <div className='upload-avatar'>
        <label htmlFor='avatar'>Upload Photo (max:500KB)</label>
        <Avatar src={imagePreviewUrl} />
        <input
          type='file'
          id='avatar'
          name='avatar'
          onChange={onUploadChange}
          accept='image/*'
        />
      </div>
      <div className='item'>
        <label htmlFor='name'>
          Full Name <span>*</span>
        </label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Your full name'
          className={
            alertName.filter((alert) => alert === 'name').toString() && 'danger'
          }
          value={name}
          onChange={onFormChange}
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
    </div>
  );
};

UpdateProfile.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps, { removeAlert })(
  styled(UpdateProfile)`
    .upload-avatar {
      display: grid;
      align-items: center;
    }
    img {
      height: 100px;
      width: 100px;
      margin: 10px;
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
    input.danger {
      border-color: ${setColor.mainRed};
      &::placeholder {
        color: ${setColor.dangerColor};
      }
    }
    span {
      color: ${setColor.mainRed};
    }
    input[type='file'] {
      border: 0;
    }
  `
);
