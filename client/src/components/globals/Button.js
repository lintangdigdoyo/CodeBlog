import styled from 'styled-components';
import { setColor, setRem } from '../../styles';

const Button = styled.button`
  background-color: ${setColor.darkBlue};
  color: ${setColor.mainWhite};
  text-transform: capitalize;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: ${setColor.mainBlue};
  }
`;

export const PrimaryButton = styled(Button)`
  width: ${setRem(200)};
  height: ${setRem(50)};
  font-size: ${setRem(18)};
  letter-spacing: 1.2px;
  background-color: ${(props) => props.outline && 'rgba(0,0,0,0)'};
  color: ${(props) => props.outline && setColor.darkBlue};
  border: ${(props) => props.outline && `1px solid ${setColor.darkBlue}`};
  ${(props) =>
    props.outline &&
    `&:hover {
    background-color: ${setColor.darkBlue};
    color: ${setColor.mainWhite};
    }`}
`;

export const SmallButton = styled(Button)`
  padding: ${setRem(8)} ${setRem(25)};
  background-color: ${(props) => props.outline && 'rgba(0,0,0,0)'};
  color: ${(props) => props.outline && setColor.darkBlue};
  border: ${(props) => props.outline && `1px solid ${setColor.darkBlue}`};
  ${(props) =>
    props.outline &&
    `&:hover {
    background-color: ${setColor.darkBlue};
    color: ${setColor.mainWhite};
    }`}
`;
