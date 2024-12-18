import { css } from 'styled-components';

const size = {
  laptopS: 1280,
  laptopM: 1366,
  laptopL: 1440,
  iPhoneS: 768,
  iPhoneM: 834,
  iPhoneL: 960,
  iPadS: 1024,
  iPadM: 1112,
  iPadL: 1194,
  desktop: 2560
};

function createMediaQueriesForDifferentSize (widthType, additionalValue=0) {
  return Object.keys(size).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (${widthType}: ${size[label]+additionalValue}px) {
        ${css(...args)}
      }
    `;
  
    return acc;
  }, {});
}

export const above = createMediaQueriesForDifferentSize('min-width', 1);
export const below = createMediaQueriesForDifferentSize('max-width');
