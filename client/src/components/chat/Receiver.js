import React, { useEffect } from 'react';
import styled from 'styled-components';

import Avatar from '../globals/Avatar';
import { setColor } from '../../styles';
import socket from '../../utils/socket';

const Receiver = ({
  className,
  chat: { userIds },
  user,
  setDisplayedReceiver,
  displayedReceiver,
  setMessage,
  setMessagesSent,
  messages,
}) => {
  useEffect(() => {
    if (displayedReceiver) {
      socket.emit('join', {
        senderId: user._id,
        receiverId: displayedReceiver.user._id,
      });
      socket.emit('leave', {
        senderId: user._id,
        receiverId: displayedReceiver.user._id,
      });
    }
    setMessagesSent(messages);
  }, [displayedReceiver, messages]);

  const receiver = userIds.filter((userId) => userId.user._id !== user._id)[0];

  return (
    <div
      className={`${className} ${
        displayedReceiver && displayedReceiver.user._id === receiver.user._id
          ? 'selected'
          : ''
      }`}
      onClick={() => {
        setDisplayedReceiver({
          ...receiver,
          user: {
            ...receiver.user,
            avatar: receiver.user && receiver.user.avatar,
          },
        });
        setMessage('');
      }}
    >
      <Avatar src={receiver.user && receiver.user.avatar} />
      {receiver.user && <h5>{receiver.user.name}</h5>}
    </div>
  );
};

export default styled(Receiver)`
  display: flex;
  align-items: center;
  margin: 10px 0;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  border: 1px solid ${setColor.mainBlue};
  background-color: ${setColor.mainWhite};
  border-radius: 10px;
  padding: 10px;
  word-break: break-word;
  &:hover {
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
  }
  h5 {
    margin: 0;
    margin-left: 10px;
  }
`;
