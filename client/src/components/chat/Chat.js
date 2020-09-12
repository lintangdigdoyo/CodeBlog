import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import socket from '../../utils/socket';

const Chat = ({ className, auth: { user } }) => {
  const [message, setMessage] = useState('');
  const [formDataOutput, setFormDataOutput] = useState([]);

  useEffect(() => {
    return () => socket.disconnect();
  }, []);

  let receiverId = '5f2fe5a91686a72fe06bdc10';

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message input', {
      message,
      senderId: user._id,
      receiverId,
    });
    setMessage('');
  };

  socket.on('chat message input', (msg) => {
    setFormDataOutput([...formDataOutput, msg]);
  });

  return (
    <div className={className}>
      {formDataOutput.map((data, index) => (
        <p key={index}>{data}</p>
      ))}
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='input text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(styled(Chat)`
  margin: 5% 0;
`);
