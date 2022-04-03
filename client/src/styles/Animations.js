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

export { rotate180, unrotate180, drawerOut, drawerIn };
