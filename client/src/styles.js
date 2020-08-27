import { css } from 'styled-components';

export const setColor = {
  primaryColor: '#0A97B0',
  successColor: '#d4edda',
  dangerColor: '#b82727',
  lightDanger: '#ffd4d4',
  mainGreen: '#155724',
  mainRed: '#E83131',
  mainBlue: '#1B6CA8',
  lightBlue: '#EAFCFF',
  darkBlue: '#0C5489',
  mainWhite: '#fff',
  mainBlack: '#222',
  mainGray: '#ececec',
  lightGray: '#FAFAFA',
  darkGray: '#7C7C7C',
};

export const setFont = {
  main: "font-family: 'Open Sans', sans-serif;",
  title: "font-family: 'Russo One', sans-serif;",
};

export const setRem = (number = 16) => {
  return `${number / 16}rem`;
};

const sizes = {
  desktop: 1400,
  tablet: 983,
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

export const setFlex = ({ x = 'center', y = 'center' } = {}) => {
  return `display:flex;justify-content:${x};align-items:${y}`;
};
