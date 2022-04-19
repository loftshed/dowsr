import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { textButtonstyling } from "../../../../../styling/sharedstyles";

const PinSubmitter = ({ popupInfo, isOwnPin }) => {
  const navigate = useNavigate();
  return (
    <PinSubmitterWrapper
      key="linkToProfile"
      disabled={!popupInfo.submittedBy}
      onClick={(ev) => {
        navigate(`/profile/${popupInfo.submittedBy}`);
      }}
    >
      {isOwnPin ? (
        <>
          Submitted by <span>you!</span>
        </>
      ) : (
        <>
          Submitted by <span>@{popupInfo.submittedBy}</span>
        </>
      )}
    </PinSubmitterWrapper>
  );
};

export default PinSubmitter;

const PinSubmitterWrapper = styled.button`
  ${textButtonstyling}
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 5px;
  border-radius: 5px;
  line-height: 10px;
  background-color: var(--color-less-dark-grey);
  width: 100%;
  gap: 5px;
  span {
    pointer-events: none;
    font-size: 14px;
    color: var(--color-teal);
  }
  &:hover {
    span {
      background-color: var(--color-pink);
      padding: 3px;
    }
  }
`;
