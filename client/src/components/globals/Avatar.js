import styled from 'styled-components';
import { setColor } from '../../styles';

const Avatar = styled.img`
  margin: 0;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 1px solid ${setColor.mainWhite};
`;

export default Avatar;
