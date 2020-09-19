import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';

import { setColor, setRem, media } from '../../styles';

const Message = ({ className, message }) => {
  return (
    <div className={className}>
      <p>{message.text}</p>
      <Moment calendar>{message.date}</Moment>
    </div>
  );
};

export default styled(Message)`
  margin: 20px;
  display: flex;
  justify-content: ${(props) =>
    props.message.user === props.user._id ? `flex-end` : `flex-start`};
  p {
    order: ${(props) => (props.message.user === props.user._id ? `2` : `1`)};
    padding: 8px 30px;
    padding-left: 15px;
    border: 1px solid ${setColor.mainBlue};
    border-radius: 20px;
    max-width: 400px;
    word-wrap: break-word;
    ${(props) =>
      props.message.user === props.user._id
        ? `border-top-right-radius: 0;
            background-color: ${setColor.darkBlue}; 
            color: ${setColor.mainWhite};
            text-align: right;`
        : `border-top-left-radius: 0`};
    display: inline;
    font-size: ${setRem(18)};
    margin: 0;
  }
  time {
    order: ${(props) => (props.message.user === props.user._id ? `1` : `2`)};
    color: ${setColor.darkGray};
    font-size: ${setRem(10)};
    margin: 0 10px;
    align-self: flex-end;
  }
  ${media.tablet`
  p {
      max-width: 150px;
      font-size: ${setRem(12)};
    }
    time {
      font-size: ${setRem(8)}
    }
  `}
`;
