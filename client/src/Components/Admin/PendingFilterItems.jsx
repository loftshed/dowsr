import styled from "styled-components";
import { centeredFlexColumn, iconstyling } from "../../styling/sharedstyles";
import PendingPin from "./PendingPin";
import {
  WaterIcon,
  ToiletIcon,
  HazardIcon,
  PoliceIcon,
} from "../../styling/react-icons";

const PendingFilterItems = ({ item, setPendingPins }) => {
  return (
    <PendingItemWrapper>
      <FilterType>
        <FilterTypeHeader>
          <Icon>
            {item.type === "water" && <WaterIcon />}
            {item.type === "toilet" && <ToiletIcon />}
            {item.type === "police" && <PoliceIcon />}
            {item.type === "hazard" && <HazardIcon />}
          </Icon>
        </FilterTypeHeader>
        <PinContainer>
          <PendingPin
            key={item._id}
            pin={item}
            setPendingPins={setPendingPins}
          />
        </PinContainer>
      </FilterType>
    </PendingItemWrapper>
  );
};

export default PendingFilterItems;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.pink};
  border: 2px solid ${(props) => props.theme.colors.superDarkGrey};
  ${centeredFlexColumn}
  margin: -10px 0px;
`;

const PinContainer = styled.div`
  background-color: ${(props) => props.theme.colors.superDarkGrey};
  border-radius: 10px;
  padding: 10px;
  height: fit-content;
`;

const PendingItemWrapper = styled.div`
  width: 100%;
  height: fit-content;
  background-color: ${(props) => props.theme.colors.teal};
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
  font-size: 14px;
`;

const FilterType = styled.div`
  ${centeredFlexColumn}padding: 0px 5px 5px 5px;
`;

const FilterTypeHeader = styled.div`
  height: 22px;
`;
