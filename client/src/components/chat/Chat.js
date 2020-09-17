import React, { useState, useEffect, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import socket from '../../utils/socket';
import { setColor, setFlex } from '../../styles';
import Avatar from '../globals/Avatar';
import { updateChat, getChat, clearChat } from '../../actions/chat';
import Receiver from './Receiver';
import { ReactComponent as Icon } from './conversation.svg';
import Message from './Message';

const Chat = ({
  className,
  auth: { user },
  updateChat,
  getChat,
  clearChat,
  location: { receiver },
  chat: { chats, loading },
}) => {
  const [message, setMessage] = useState('');
  const [messageLength, setMessageLength] = useState(0);
  const [displayedReceiver, setDisplayedReceiver] = useState();
  const [messagesSent, setMessagesSent] = useState();
  const [typing, setTyping] = useState(false);

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
  }, [getChat, clearChat]);

  useEffect(() => {
    setDisplayedReceiver(receiver);
  }, [receiver]);

  let time;
  socket.on('typing', (data) => {
    clearTimeout(time);
    setTyping(data);
    time = setTimeout(() => {
      setTyping(false);
    }, 1000);
  });

  //get messages from the chosen receiver
  let allReceiver = chats.map((chat) =>
    chat.userIds.map((users) => users.user._id)
  );
  allReceiver = allReceiver.map((id) => id.filter((id) => id !== user._id));
  const indexReceiver = allReceiver
    .toString()
    .split(',')
    .indexOf(displayedReceiver && displayedReceiver.user._id);

  socket.on(`chat ${user._id} output`, (msg) => {
    updateChat(msg);
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => scrollToBottom, [
    scrollToBottom,
    displayedReceiver,
    messagesEndRef.current,
  ]);

  useEffect(() => {
    setMessageLength(
      chats[indexReceiver] && chats[indexReceiver].message.length
    );
  }, [indexReceiver, scrollToBottom]);

  if (
    chats[indexReceiver] &&
    chats[indexReceiver].message.length > messageLength
  ) {
    scrollToBottom();
  }

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message input', {
      message,
      senderId: user._id,
      receiverId: displayedReceiver.user._id,
    });
    setMessage('');
  };

  return (
    <div className={className}>
      <aside>
        <h1>Chat</h1>
        {!loading && (
          <Fragment>
            {chats.length > 0 ? (
              chats.map((chat) => (
                <Receiver
                  key={chat._id}
                  chat={chat}
                  user={user}
                  setMessage={setMessage}
                  setDisplayedReceiver={setDisplayedReceiver}
                  displayedReceiver={displayedReceiver}
                  setMessagesSent={setMessagesSent}
                  messages={
                    chats[indexReceiver] && chats[indexReceiver].message
                  }
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
              <Link to={`/profile/${displayedReceiver.user._id}`}>
                <Avatar src={displayedReceiver.user.avatar} />
              </Link>
              <div className='item'>
                <Link to={`/profile/${displayedReceiver.user._id}`}>
                  <h3>{displayedReceiver.user.name}</h3>
                </Link>
                {typing && <span>typing...</span>}
              </div>
            </div>
            <div className='inbox' ref={messagesEndRef}>
              {messagesSent &&
                messagesSent.map((message) => (
                  <Message key={message._id} message={message} user={user} />
                ))}
            </div>
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
  border-radius: 10px;
  display: grid;
  background-color: ${setColor.mainWhite};
  grid-template-columns: 30% 1fr;
  min-height: 75vh;
  h1 {
    color: ${setColor.darkBlue};
  }
  aside {
    padding: 7%;
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
    padding: 3%;
    .receiver {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      img {
        height: 60px;
        width: 60px;
      }
      .item {
        margin-left: 10px;
        a {
          h3 {
            margin: 0;
            color: ${setColor.mainBlack};
          }
        }
        span {
          color: ${setColor.darkGray};
        }
      }
    }

    .inbox {
      height: 400px;
      overflow-y: auto;
    }
    form {
      display: flex;
      margin-top: 3%;
      input {
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid ${setColor.darkGray};
        outline: none;
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
