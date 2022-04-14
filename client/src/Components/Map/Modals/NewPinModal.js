import { useContext, useEffect } from "react";
import styled from "styled-components";
import { MappingContext } from "../../../Context/MappingContext";
import { SIZES } from "../../../Styling/constants";
import {
  centeredFlexColumn,
  centeredFlexRow,
  fillSpace,
  Input,
} from "../../../Styling/StyledComponents";

const NewPinModal = () => {
  const { clickedLocation, setShowNewPinModal } = useContext(MappingContext);
  console.log(clickedLocation);
  console.log(`${clickedLocation?.addressShort}`);

  return (
    <NewPinModalWrapper>
      <InnerContainer>
        <Heading>Creating a new pin</Heading>
        <Subheading>
          Latitude {clickedLocation?.lat.toFixed(4)}, Longitude{" "}
          {clickedLocation?.lng.toFixed(4)}
        </Subheading>

        <InnerContainerLiner>
          <InputRow>
            <InputHeading>Verify address</InputHeading>
            <ModalInput defaultValue={clickedLocation?.addressShort} />
          </InputRow>
        </InnerContainerLiner>
      </InnerContainer>
    </NewPinModalWrapper>
  );
};

export default NewPinModal;

const NewPinModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: fit-content;
  bottom: 70px;
  padding-left: 2px;
`;

const Heading = styled.div`
  ${centeredFlexRow}
  width: 100%;
  height: fit-content;
  border-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-pink);
  outline: 1px solid var(--color-super-dark-grey);
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
  padding: 10px;
`;

const InputRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
const InputHeading = styled(Subheading)`
  padding: 0px 5px;
`;

const ModalInput = styled(Input)`
  padding-left: 7.5px;
  letter-spacing: 1px;
  background-color: var(--color-super-dark-grey);
`;
