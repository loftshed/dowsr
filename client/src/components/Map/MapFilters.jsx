import styled, { css } from "styled-components/macro";
import {
  centeredFlexColumn,
  fillSpace,
  iconstyling,
} from "../../styling/sharedstyles";
import {
  StoreIcon,
  CoffeeIcon,
  PoliceIcon,
  HazardIcon,
  BikeIcon,
  FilterIcon,
  WaterIcon,
  ToiletIcon,
  PendingIcon,
} from "../../styling/react-icons";
import { useContext } from "react";
import { MappingContext } from "./MappingContext";
import { AppContext } from "../AppContext";
import {} from "../../styling/react-icons";

//TODO: Not important but annoying. Fix method by which modal fades out. currently not ideal.

const MapFilters = ({ showFilterMenu, setShowFilterMenu }) => {
  const { setSelectedMapFilter, setMapModalMessage } =
    useContext(MappingContext);
  const { setShowBurgerMenu, showBurgerMenu, loggedInUser } =
    useContext(AppContext);

  const handleFilter = (type, friendlyName) => {
    setSelectedMapFilter(type);
    setMapModalMessage(`Filtering by: ${friendlyName}`);
    setTimeout(() => {
      setMapModalMessage("");
    }, 2500);
  };

  return (
    <Boundary>
      <ToggleWrapper>
        <FilterToggle>
          <InnerContainerLiner>
            <Option
              onClick={() => {
                setShowFilterMenu(!showFilterMenu);
                if (showBurgerMenu) setShowBurgerMenu(false);
              }}
            >
              <FilterIcon />
            </Option>
          </InnerContainerLiner>
        </FilterToggle>
      </ToggleWrapper>
      <Filters show={showFilterMenu}>
        <FilterMenuWrapper>
          <InnerContainer>
            <InnerContainerLiner>
              <Option
                type="button"
                onClick={() => {
                  handleFilter("shops", "Bike Shops");
                }}
              >
                <BikeIcon />
              </Option>
              <Option
                type="button"
                onClick={() => {
                  handleFilter("deps", "Stores");
                }}
              >
                <StoreIcon />
              </Option>
              <Option
                type="button"
                onClick={() => {
                  handleFilter("cafes", "Coffee");
                }}
              >
                <CoffeeIcon />
              </Option>
              <Option
                type="button"
                onClick={() => {
                  handleFilter("water", "Water");
                }}
              >
                <WaterIcon />
              </Option>
              <Option
                type="button"
                onClick={() => {
                  handleFilter("toilet", "Toilets");
                }}
              >
                <ToiletIcon />
              </Option>
              <Option
                type="button"
                onClick={() => {
                  handleFilter("police", "Police");
                }}
              >
                <PoliceIcon />
              </Option>
              <Option
                type="button"
                onClick={() => {
                  handleFilter("hazard", "Hazards");
                }}
              >
                <HazardIcon />
              </Option>
              {loggedInUser && loggedInUser?.isAdmin && (
                <Option
                  type="button"
                  onClick={() => {
                    handleFilter("pending", "Pending");
                  }}
                >
                  <PendingIcon />
                </Option>
              )}
            </InnerContainerLiner>
          </InnerContainer>
        </FilterMenuWrapper>
      </Filters>
    </Boundary>
  );
};

export default MapFilters;

const menuWrapperstyling = css`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  background-color: ${(props) => props.theme.colors.darkGrey};
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  padding: 5px;
  pointer-events: auto;
`;

const Filters = styled.div`
  position: absolute;
  top: ${(props) => (props.show ? "70px" : "-500px")};
  transition: all 0.3s ease;
  z-index: 5;
`;

const Boundary = styled.div`
  position: absolute;
  height: calc(100% - 40px);
  right: 10px;
  top: 40px;
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
  pointer-events: none;
  padding: 1px;
  overflow: hidden;
`;

const FilterMenuWrapper = styled.div`
  ${menuWrapperstyling};
`;

const InnerContainer = styled.div`
  ${fillSpace}
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
  background-color: ${(props) => props.theme.colors.darkestGrey};
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  padding: 5px;
`;

const InnerContainerLiner = styled.div`
  ${centeredFlexColumn}
  gap: 5px;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const ToggleWrapper = styled.div`
  position: relative;
  z-index: 10;
  ${menuWrapperstyling}
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
`;

const FilterToggle = styled(InnerContainer)`
  z-index: 10;
`;

const Option = styled.button`
  ${iconstyling}
`;
