import styled from "styled-components/macro";
import { centeredFlexRow } from "../../styling/sharedstyles";
import { moderatePendingPin } from "./helpers";
// import { getPinsPendingReview } from "../Map/helpers";
import { MappingContext } from "../Map/MappingContext";
import { useContext } from "react";

const PendingPin = ({ pin, setPendingPins }) => {
  const { setModerationResult } = useContext(MappingContext);
  const {
    _id,
    type,
    latitude,
    longitude,
    hours,
    address,
    desc,
    submittedBy,
    submittedById,
    submitted,
  } = pin;

  const handleModeratePendingPin = async (pinId, approved) => {
    try {
      const { message } = await moderatePendingPin(pinId, approved);
      setModerationResult(message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PendingPinWrapper>
      <ul>
        <Heading>
          <li>
            <span>pinId</span> {_id}
          </li>
        </Heading>
        <Details>
          <li>
            <span>filter</span> {type}
          </li>
          <a
            href={`http://maps.google.com/maps?q=&layer=c&cbll=${latitude},${longitude}`}
            target="_new"
          >
            <li>
              <span>latitude</span> {latitude}
            </li>
            <li>
              <span>longitude</span> {longitude}
            </li>
          </a>
          <li>
            <span>hours</span> {hours}
          </li>
          <li>
            <span>address</span> {address}
          </li>
          <li>
            <span>desc</span> '{desc}'
          </li>
          <li>
            <span>submittedBy</span>{" "}
            <a
              href={`http://localhost:3000/users/${submittedBy}`}
              target="_new"
            >
              <span style={{ color: "${(props) => props.theme.colors.teal}" }}>
                @
              </span>
              {submittedBy}
            </a>
          </li>
          <li>
            <span>submittedById</span> {submittedById}
          </li>
          <li>
            <span>submitted</span> {submitted}
          </li>
        </Details>
      </ul>
      <ButtonRow>
        <button
          onClick={() => {
            handleModeratePendingPin(_id, true);
          }}
        >
          Approve
        </button>
        <button
          onClick={() => {
            handleModeratePendingPin(_id, false);
          }}
        >
          Reject
        </button>
      </ButtonRow>
      <Divider />
    </PendingPinWrapper>
  );
};

export default PendingPin;

const Details = styled.div`
  padding: 4px;
`;

const Divider = styled.div`
  height: 10px;
  margin-top: 5px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.darkGrey};
`;

const ButtonRow = styled.div`
  ${centeredFlexRow}
  padding-top: 3px;
  gap: 10px;
`;

const Heading = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  padding: 5px;
  margin-bottom: 3px;
`;

const PendingPinWrapper = styled.div`
  outline: 3px solid ${(props) => props.theme.colors.darkGrey};
  border-radius: 3px;
  ul {
    all: unset;
    list-style: none;
  }
  * {
    font-family: "Fira Mono", monospace;
  }
  span {
    font-family: inherit;
    font-weight: 600;
    color: ${(props) => props.theme.colors.pink};
  }
  button {
    font-weight: 600;
    border-radius: 2px;
    border: unset;
    text-align: center;
    background-color: ${(props) => props.theme.colors.pink};
    width: 130px;
    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.colors.mediumGrey};
      color: ${(props) => props.theme.colors.pink};
    }
    &:active {
      background-color: ${(props) => props.theme.colors.teal};
      transform: scale(0.95);
    }
  }
  a {
    &:hover {
      cursor: pointer;
    }
  }
`;
