import { css } from 'styled-components';

export const setColor = {
  primaryColor: '#0A97B0',
  dangerColor: '#E83131',
  mainBlue: '#1B6CA8',
  lightBlue: '#EAFCFF',
  darkBlue: '#0C5489',
  mainWhite: '#fff',
  mainBlack: '#222',
  mainGray: '#ececec',
  lightGray: '#FAFAFA',
};

export const setFont = {
  main: "font-family: 'Open Sans', sans-serif;",
  title: "font-family: 'Russo One', sans-serif;",
};

export const setRem = (number = 16) => {
  return `${number / 16}rem`;
};

const sizes = {
  desktop: 1156,
  tablet: 835,
  phone: 576,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
