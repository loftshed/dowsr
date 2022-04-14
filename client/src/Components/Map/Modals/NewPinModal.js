import { useContext, useEffect } from "react";
import styled from "styled-components";
import { MappingContext } from "../../../Context/MappingContext";
import { SIZES } from "../../../Styling/constants";
import { CloseIcon } from "../../../Styling/Icons";
import {
  centeredFlexColumn,
  centeredFlexRow,
  fillSpace,
  Input,
  inputStyling,
  textButtonStyling,
} from "../../../Styling/StyledComponents";

const NewPinModal = () => {
  const { clickedLocation, setShowNewPinModal } = useContext(MappingContext);
  console.log(clickedLocation);
  console.log(`${clickedLocation?.addressShort}`);

  return (
    <NewPinModalWrapper>
      <InnerContainer>
        <Heading>
          <span>Creating a new pin</span>
          <CloseIcon />
        </Heading>
        <Subheading>
          Latitude {clickedLocation?.lat.toFixed(4)}, Longitude{" "}
          {clickedLocation?.lng.toFixed(4)}
        </Subheading>
        <InnerContainerLiner>
          <ModalForm
            onSubmit={(ev) => {
              ev.preventDefault();
              console.log(ev);
            }}
          >
            <InputRow>
              <InputColumn>
                <InputHeading>Type</InputHeading>
                <ModalSelect>
                  <Option value="default">Select one:</Option>
                  <Option value="toilet">Toilets</Option>
                  <Option value="water">Water</Option>
                </ModalSelect>
              </InputColumn>
            </InputRow>
            <InputColumn>
              <InputHeading>Verify the approximate address</InputHeading>
              <ModalInput
                type="text"
                defaultValue={clickedLocation?.addressFull}
              />
            </InputColumn>
            <InputColumn>
              <InputHeading>Opening hours (if not 24/7)</InputHeading>
              <ModalInput type="text" />
            </InputColumn>
            <ModalSubmit type="submit" />
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
  ${textButtonStyling}
  padding: 5px 20px;
`;

const ModalForm = styled.form`
  ${centeredFlexColumn}
  gap: 7.5px;
`;

const Option = styled.option``;