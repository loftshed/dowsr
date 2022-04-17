import styled from "styled-components";
import { centeredFlexRow } from "../../styling/sharedstyles";
import { useNavigate } from "react-router-dom";

const PendingPin = ({ pin }) => {
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
  return (
    <PendingPinWrapper>
      <ul>
        <Heading>
          <li>
            <span>pinId</span> {_id}
          </li>
        </Heading>
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
          <a href={`http://localhost:3000/users/${submittedBy}`} target="_new">
            <span style={{ color: "var(--color-teal)" }}>@</span>
            {submittedBy}
          </a>
        </li>
        <li>
          <span>submittedById</span> {submittedById}
        </li>
        <li>
          <span>submitted</span> {submitted}
        </li>
      </ul>
      <ButtonRow>
        <button>Approve</button>
        <button>Reject</button>
      </ButtonRow>
    </PendingPinWrapper>
  );
};

export default PendingPin;

const ButtonRow = styled.div`
  ${centeredFlexRow}
  padding-top: 3px;
  gap: 10px;
`;

const Heading = styled.div`
  background-color: var(--color-dark-grey);
  padding: 5px;
  margin-bottom: 3px;
  border-radius: 3px;
`;

const PendingPinWrapper = styled.div`
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
    color: var(--color-pink);
  }
  button {
    border-radius: 2px;
    border: unset;
    text-align: center;
    background-color: var(--color-pink);
    width: 130px;
    &:hover {
      cursor: pointer;
      background-color: var(--color-medium-grey);
    }
    &:active {
      background-color: var(--color-teal);
      transform: scale(0.95);
    }
  }
  a {
    &:hover {
      cursor: pointer;
    }
  }
`;
