import { createGlobalStyle } from 'styled-components';
import { setFont, setColor } from '../../styles';

const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body {
        ${setFont.main} ;
        background-color: ${(props) =>
          props.lightBlue ? setColor.lightBlue : setColor.lightGray};
    }
`;

export default GlobalStyle;
