import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import socket from '../../utils/socket';
import { setColor, setFlex } from '../../styles';
import Avatar from '../globals/Avatar';
import { updateChat, getChat, clearChat } from '../../actions/chat';
import Receiver from './Receiver';
import { ReactComponent as Icon } from './conversation.svg';

const Chat = ({
  className,
  auth: { user },
  updateChat,
  getChat,
  clearChat,
  chat: { chats, loading },
}) => {
  useEffect(() => {
    socket.emit('get message', {
      senderId: user._id,
    });
    socket.on('get message', (msg) => {
      getChat(msg);
    });
    return () => {
      clearChat();
    };
  }, []);

  const [message, setMessage] = useState('');
  const [displayedReceiver, setDisplayedReceiver] = useState();
  const [typing, setTyping] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message input', {
      message,
      senderId: user._id,
      receiverId: displayedReceiver.user._id,
    });
    setMessage('');
  };

  socket.on('chat message output', (msg) => {
    updateChat(msg);
  });

  socket.on('typing', (data) => {
    setTyping(data);
  });

  console.log(typing);

  return (
    <div className={className}>
      <aside>
        <h2>Chat</h2>
        {!loading && (
          <Fragment>
            {chats.length > 0 ? (
              chats.map((chat) => (
                <Receiver
                  key={chat._id}
                  chat={chat}
                  user={user}
                  setDisplayedReceiver={setDisplayedReceiver}
                  displayedReceiver={displayedReceiver}
                />
              ))
            ) : (
              <span>You haven't start any conversation</span>
            )}
          </Fragment>
        )}
      </aside>

      <div className='inbox-wrapper'>
        {displayedReceiver ? (
          <Fragment>
            <div className='receiver'>
              <Avatar src={displayedReceiver.user.avatar} />
              <h3>{displayedReceiver.user.name}</h3>
              {typing && <span>typing...</span>}
            </div>
            <div className='inbox'>{``}</div>
            <form onSubmit={onSubmit}>
              <input
                type='text'
                placeholder='Write message...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={() =>
                  socket.emit('typing', {
                    senderId: user._id,
                    receiverId: displayedReceiver.user._id,
                  })
                }
              />
              <button>
                <i className='fas fa-paper-plane'></i>
              </button>
            </form>
          </Fragment>
        ) : (
          <div className='icon-wrapper'>
            <Icon />
          </div>
        )}
      </div>
    </div>
  );
};

Chat.propTypes = {
  auth: PropTypes.object.isRequired,
  updateChat: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,
  getChat: PropTypes.func.isRequired,
  clearChat: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat,
});

export default connect(mapStateToProps, {
  updateChat,
  getChat,
  clearChat,
})(styled(Chat)`
  margin: 5% 0;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
  display: grid;
  background-color: ${setColor.mainWhite};
  grid-template-columns: 30% 1fr;
  min-height: 75vh;
  h2 {
    color: ${setColor.darkBlue};
  }
  aside {
    padding: 5%;
    border-right: 1px solid ${setColor.mainGray};
    background-color: ${setColor.lightBlue};
    overflow: auto;
    span {
      color: ${setColor.mainBlue};
      font-style: italic;
    }
    .selected {
      background-color: ${setColor.mainBlue};
      color: ${setColor.mainWhite};
    }
  }
  .inbox-wrapper {
    padding: 2%;
    .receiver {
      display: flex;
      align-items: center;
      img {
        height: 60px;
        width: 60px;
      }
      h3 {
        margin: 0;
        margin-left: 10px;
      }
    }
    .inbox {
      height: 400px;
      overflow: auto;
    }
    form {
      display: flex;
      margin-top: 10px;
      input {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid ${setColor.darkGray};
      }
      button {
        padding: 15px;
        border-radius: 100%;
        border: none;
        color: ${setColor.mainWhite};
        cursor: pointer;
        background-color: ${setColor.darkBlue};
        margin-left: 10px;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: ${setColor.mainBlue};
        }
      }
    }
    .icon-wrapper {
      ${setFlex};
      svg {
        width: 40%;
      }
    }
  }
`);
