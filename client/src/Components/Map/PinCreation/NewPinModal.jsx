import { useContext } from "react";
import styled from "styled-components/macro";
import { MappingContext } from "../MappingContext";
import { CloseIcon } from "../../../styling/react-icons";
import {
  centeredFlexColumn,
  centeredFlexRow,
  fillSpace,
} from "../../../styling/sharedstyles";
import { submitPin } from "../helpers";
import NewResourcePinForm from "./NewResourcePinForm";
import ChoosePinFormType from "./ChoosePinFormType";
import NewWarningPinForm from "./NewWarningPinForm";

// Called from the Menu component
// DON'T FORGET TO VALIDATE THE FRIGGIN DATA BRUH

const NewPinModal = ({ show, type }) => {
  const {
    clickedLocation,
    setShowPinCreationModal,
    setCreatingNewPin,
    setMapModalMessage,
    setPinCreationSuccessful,
    newPinData,
    setNewPinData,
  } = useContext(MappingContext);

  const handleSubmitPin = async (ev, clickedLocation, loggedInUser, hours) => {
    try {
      const result = await submitPin(ev, clickedLocation, loggedInUser, hours);
      // clean up this goddamn mess of state!
      console.log(result);
      if (result.success) {
        setNewPinData(result.submission);
        setCreatingNewPin(false);
        setShowPinCreationModal(false);
        setPinCreationSuccessful(true);
        // setStoredFilteredPins(
        //   handleGetPinsOfType(await result.submission.type)
        // );
        setMapModalMessage(`Thank you, @${loggedInUser.username}!`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (show && type === "creation")
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

          <NewWarningPinForm handleSubmitPin={handleSubmitPin} />
          {/* <NewResourcePinForm handleSubmitPin={handleSubmitPin} /> */}
        </InnerContainer>
      </NewPinModalWrapper>
    );

  if (show && type === "success")
    return (
      <NewPinModalWrapper>
        <InnerContainer>
          <Heading>
            Pin created successfully :){" "}
            <button
              style={{ all: "unset" }}
              onClick={(ev) => {
                setPinCreationSuccessful(null);
                setNewPinData(null);
                setMapModalMessage("");
              }}
            >
              <CloseIcon />
            </button>
          </Heading>
          <Subheading>
            Latitude {newPinData.latitude.toFixed(4)}, Longitude{" "}
            {newPinData.longitude.toFixed(4)}
          </Subheading>
          <InnerContainerLiner>
            Awesome! Your submission has been entered into the queue for review
            and will be added to the map shortly.
          </InnerContainerLiner>
        </InnerContainer>
      </NewPinModalWrapper>
    );
};

export default NewPinModal;

const NewPinModalWrapper = styled.div`
  position: absolute;
  width: fit-content;
  height: fit-content;
  bottom: 70px;
  padding-left: 2px;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.3s ease;
  @media (max-width: 450px) {
    width: 98%;
  }
`;

const Heading = styled.div`
  position: relative;
  ${centeredFlexRow}
  width: 100%;
  height: fit-content;
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
  background-color: ${(props) => props.theme.colors.pink};
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  user-select: none;
  margin: 2px 0px;
  svg {
    fill: ${(props) => props.theme.colors.lessDarkGrey};
    background-color: ${(props) => props.theme.colors.lightGrey};
    border-radius: 50%;
    position: absolute;
    right: 2.5px;
    height: 20px;
    bottom: 1.25px;
    width: 20px;

    &:hover {
      fill: ${(props) => props.theme.colors.teal};
      cursor: pointer;
    }
    &:active {
      fill: ${(props) => props.theme.colors.superDarkGrey};
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
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  background-color: ${(props) => props.theme.colors.darkestGrey};
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
  padding: 5px;
`;

const InnerContainerLiner = styled.div`
  ${centeredFlexColumn}
  ${fillSpace}
  background-color: ${(props) => props.theme.colors.darkGrey};
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  border-radius: 4px;
  gap: 5px;
  padding: 10px 20px;
  text-align: center;
`;
