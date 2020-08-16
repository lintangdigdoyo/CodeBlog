import { createGlobalStyle } from 'styled-components';
import { setFont, setColor } from '../../styles';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Russo+One&display=swap');

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
