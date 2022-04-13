import styled, { css } from "styled-components";
import { SIZES } from "../../Styling/constants";
import {
  centeredFlexColumn,
  fillSpace,
  iconStyling,
} from "../../Styling/StyledComponents";
import {
  StoreIcon,
  CoffeeIcon,
  PoliceIcon,
  HazardIcon,
  BikeIcon,
  FilterIcon,
} from "../../Styling/Icons";
import { useContext, useEffect } from "react";
import { MappingContext } from "../../Context/MapContext";
import { AppContext } from "../../Context/AppContext";

//TODO: Not important but annoying. Fix method by which modal fades out. currently not ideal.

const MapFilters = ({ showFilterMenu, setShowFilterMenu }) => {
  const { selectedMapFilter, setSelectedMapFilter, setMapModalMessage } =
    useContext(MappingContext);
  const { setShowBurgerMenu, showBurgerMenu } = useContext(AppContext);

  // for testing
  // useEffect(() => {
  //   console.log(selectedMapFilter);
  // }, [selectedMapFilter]);

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
                  setSelectedMapFilter("bike-shops");
                  setMapModalMessage("Filtering by: Bike Shops");
                  setTimeout(() => {
                    setMapModalMessage("");
                  }, 2500);
                }}
              >
                <BikeIcon />
              </Option>
              <Option
                type="button"
                onClick={() => {
                  setSelectedMapFilter("deps");
                  setMapModalMessage("Filtering by: Stores");
                  setTimeout(() => {
                    setMapModalMessage("");
                  }, 2500);
                }}
              >
                <StoreIcon />
              </Option>
              <Option
                type="button"
                onClick={() => {
                  setSelectedMapFilter("cafes");
                  setMapModalMessage("Filtering by: Coffee");
                  setTimeout(() => {
                    setMapModalMessage("");
                  }, 2500);
                }}
              >
                <CoffeeIcon />
              </Option>
              <Option
                type="button"
                onClick={() => {
                  setSelectedMapFilter("hazards");
                  setMapModalMessage("Filtering by: Hazards");
                  setTimeout(() => {
                    setMapModalMessage("");
                  }, 2500);
                }}
              >
                <HazardIcon />
              </Option>
              <Option
                type="button"
                onClick={() => {
                  setSelectedMapFilter("popo");
                  setMapModalMessage("Filtering by: Police");
                  setTimeout(() => {
                    setMapModalMessage("");
                  }, 2500);
                }}
              >
                <PoliceIcon />
              </Option>
            </InnerContainerLiner>
          </InnerContainer>
        </FilterMenuWrapper>
      </Filters>
    </Boundary>
  );
};

export default MapFilters;

const menuWrapperStyling = css`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  background-color: var(--color-dark-grey);
  border-radius: ${SIZES.borderRadius}px;
  outline: 1px solid var(--color-super-dark-grey);
  padding: 5px;
  pointer-events: auto;
`;

const Filters = styled.div`
  position: absolute;
  top: ${(props) => (props.show ? "70px" : "-500px")};
  transition: all 0.3s ease;
`;

const Boundary = styled.div`
  position: absolute;
  height: 100%;
  right: 10px;
  top: 40px;
  border-radius: ${SIZES.borderRadius}px;
  pointer-events: none;
  padding: 1px;
  overflow: hidden;
`;

const FilterMenuWrapper = styled.div`
  ${menuWrapperStyling}
  z-index: -1;
`;

const InnerContainer = styled.div`
  ${fillSpace}
  border-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-darkest-grey);
  outline: 1px solid var(--color-super-dark-grey);
  padding: 5px;
`;

const ToggleWrapper = styled.div`
  position: relative;
  z-index: 10;
  ${menuWrapperStyling}
  outline: 1px solid var(--color-super-dark-grey);
`;

const FilterToggle = styled(InnerContainer)`
  z-index: 10;
`;

const InnerContainerLiner = styled.div`
  ${centeredFlexColumn}
  gap: 5px;
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Option = styled.button`
  ${iconStyling}
`;
