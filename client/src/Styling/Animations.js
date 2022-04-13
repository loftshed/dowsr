import { keyframes } from "styled-components";

const rotate180 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-180deg);
  }
`;

const unrotate180 = keyframes`
  from {
    transform: rotate(-180deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const drawerOut = keyframes`
  from {
    transform: translateX(-148px);
  }
  to {
    transform: translateX(0px);
  }
`;

const drawerIn = keyframes`
  from {
    transform: translateX(0px);
  }
  to {  
    transform: translateX(-148px);
  }
`;

const gradientScroll = keyframes`
  from {
    transform: translateX(0px);
  }
  to {  
    transform: translateX(-300px);
  }
`;

const fadeIn = keyframes`
from {
    opacity: 0%
  }
  to {  
    opacity: 100%
  }
`;
const fadeOut = keyframes`
from {
    opacity: 100%
  }
  to {  
    opacity: 0%
  }`;

export {
  rotate180,
  unrotate180,
  rotate360,
  drawerOut,
  drawerIn,
  gradientScroll,
  fadeIn,
  fadeOut,
};
