import styled from "styled-components/macro";
import { centeredFlexColumn } from "../../styling/sharedstyles";
const UniversalMapPin = ({ scale, onClick, children, color }) => {
  return (
    <UniversalPinWrapper scale={scale} color={color} onClick={onClick}>
      <IconContainer>
        <Icon color={color}>{children}</Icon>
      </IconContainer>
      <Point />
    </UniversalPinWrapper>
  );
};
export default UniversalMapPin;

const Icon = styled.div`
  top: 6px;
  position: absolute;
  ${centeredFlexColumn}
  svg {
    margin: 0;

    width: 25px;
    height: 25px;
    fill: ${({ color }) => color};
    padding: ${({ type }) => {
      if (type === "toilet") return "5px";
      if (type === "water") return "0";
      if (type === "hazard") return "0";
      if (type === "police") return "0";
    }};
  }
`;

const IconContainer = styled.div`
  ${centeredFlexColumn}
  position: relative;
  border-radius: 50%;
  filter: drop-shadow(0px 0px 1px ${(props) => props.theme.colors.teal});
  padding: 17.5px;
  z-index: 2;
  background-color: ${(props) => props.theme.colors.mediumGrey};
  margin-bottom: -10px;
`;

const Point = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid ${(props) => props.theme.colors.lightGrey};
  transform: scaleX(0.3);
  z-index: 1;
  filter: drop-shadow(0px 0px 1px ${(props) => props.theme.colors.teal});
`;

const UniversalPinWrapper = styled.div`
  position: relative;
  ${centeredFlexColumn}
  /* background-color: yellow; */
  width: 30px;
  height: 40px;
  transform: scale(${(props) => props.scale});
  * {
    pointer-events: none;
  }
  filter: drop-shadow(0px 0px 1px ${(props) => props.theme.colors.teal});
`;
