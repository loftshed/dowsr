import { RiMapPin3Line } from "react-icons/ri";
import { ToiletIcon } from "../../../styling/react-icons";
import styled from "styled-components";
import { centeredFlexColumn } from "../../../styling/sharedstyles";
const UniversalMapPin = ({ scale, resource, onClick, children, color }) => {
  return (
    <UniversalPinWrapper
      scale={scale}
      color={(color = "var(--color-pink)")}
      onClick={onClick}
    >
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
    padding: 0;
    width: 25px;
    height: 25px;
    fill: ${({ color }) => color};
  }
`;

const IconContainer = styled.div`
  ${centeredFlexColumn}
  position: relative;
  border-radius: 50%;
  outline: solid 1px black;
  padding: 17.5px;
  z-index: 2;
  background-color: var(--color-medium-grey);
  margin-bottom: -10px;
`;

const Point = styled.div`
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid var(--color-light-grey);
  transform: scaleX(0.3);
  z-index: 1;
  filter: drop-shadow(0px 0px 1px var(--color-teal));
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
  filter: drop-shadow(0px 0px 1px var(--color-teal));
`;
