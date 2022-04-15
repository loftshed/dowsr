import { useContext, useEffect } from "react";
import styled from "styled-components";
import { MappingContext } from "../MappingContext";
import { SIZES } from "../../../../styling/constants";
import { CloseIcon } from "../../../../styling/react-icons";
import {
  centeredFlexColumn,
  centeredFlexRow,
  fillSpace,
  Input,
  inputStyling,
  textButtonstyling,
} from "../../../../styling/sharedstyles";
import { handleSubmitPin } from "../helpers";

const NewPinModal = ({ show }) => {
  const {
    setClickedLocation,
    clickedLocation,
    setShowPinCreationModal,
    setCreatingNewPin,
    setMapModalMessage,
  } = useContext(MappingContext);

  if (show)
    return (
      <NewPinModalWrapper>
        <InnerContainer>
          <Heading>
            <span>Creating a new pin</span>
            <button
              style={{ all: "unset" }}
              onClick={(ev) => {
                setShowPinCreationModal(false);
                setCreatingNewPin(false);
                setMapModalMessage("");
              }}
            >
              <CloseIcon />
            </button>
          </Heading>
          <Subheading>
            Latitude {clickedLocation?.lat.toFixed(4)}, Longitude{" "}
            {clickedLocation?.lng.toFixed(4)}
          </Subheading>
          <InnerContainerLiner>
            <ModalForm
              onSubmit={(ev) => {
                ev.preventDefault();
                handleSubmitPin(ev, clickedLocation);
              }}
            >
              <InputRow>
                <InputColumn>
                  <InputHeading>Type</InputHeading>
                  <ModalSelect>
                    <Option value="default">Select one:</Option>
                    <Option value="toilet">Toilets</Option>
                    <Option value="water">Water</Option>
                    <Option value="police">Police</Option>
                    <Option value="hazard">Hazard</Option>
                  </ModalSelect>
                </InputColumn>
              </InputRow>
              <InputColumn>
                <InputHeading>Verify the approximate address</InputHeading>
                <ModalInput
                  type="text"
                  key="address"
                  id="address"
                  value={clickedLocation?.addressFull}
                  // Using onChange, it is possible to edit a field with a value that was assigned using state.
                  onChange={(ev) => {
                    setClickedLocation({
                      ...clickedLocation,
                      addressFull: ev.currentTarget.value,
                    });
                  }}
                />
              </InputColumn>
              <InputColumn>
                <InputHeading>Opening hours (if not 24/7)</InputHeading>
                <ModalInput id="hours" key="hours" type="text" />
              </InputColumn>
              <ModalSubmit id="submit" key="submit" type="submit" />
            </ModalForm>
          </InnerContainerLiner>
        </InnerContainer>
      </NewPinModalWrapper>
    );
};

export default NewPinModal;

const NewPinModalWrapper = styled.div`
  position: absolute;
  width: 98%;
  height: fit-content;
  bottom: 70px;
  padding-left: 2px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;
`;

const Heading = styled.div`
  position: relative;
  ${centeredFlexRow}
  width: 100%;
  height: fit-content;
  border-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-pink);
  outline: 1px solid var(--color-super-dark-grey);
  user-select: none;
  margin: 2px 0px;
  svg {
    fill: var(--color-less-dark-grey);
    background-color: var(--color-light-grey);
    border-radius: 50%;
    position: absolute;
    right: 2.5px;
    height: 20px;
    bottom: 1.25px;
    width: 20px;

    &:hover {
      fill: var(--color-teal);
      cursor: pointer;
    }
    &:active {
      fill: var(--color-super-dark-grey);
      cursor: pointer;
    }
  }
`;

const Subheading = styled.div`
  ${centeredFlexRow}
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 10px;
  padding: 2px;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${fillSpace}
  outline: 1px solid var(--color-super-dark-grey);
  background-color: var(--color-darkest-grey);
  border-radius: ${SIZES.borderRadius}px;
  padding: 5px;
`;

const InnerContainerLiner = styled.div`
  ${centeredFlexColumn}
  ${fillSpace}
  background-color: var(--color-dark-grey);
  outline: 1px solid var(--color-super-dark-grey);
  border-radius: 4px;
  gap: 5px;
  padding: 10px 20px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 7.5px;
`;

const InputColumn = styled.div`
  ${centeredFlexColumn}
  width: 100%;
`;

const InputHeading = styled(Subheading)`
  padding: 0px 5px;
  user-select: none;
`;

const ModalInput = styled(Input)`
  padding-left: 7.5px;
  letter-spacing: 1px;
  background-color: var(--color-super-dark-grey);
`;

const ModalSelect = styled.select`
  ${inputStyling}
  background-color: var(--color-super-dark-grey);
`;

const ModalSubmit = styled(Input)`
  all: unset;
  background-color: var(--color-darkest-grey);
  ${textButtonstyling}
  padding: 5px 20px;
`;

const ModalForm = styled.form`
  ${centeredFlexColumn}
  gap: 7.5px;
`;

const Option = styled.option``;
