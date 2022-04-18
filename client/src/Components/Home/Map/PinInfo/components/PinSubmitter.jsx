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
  position: relative;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  line-height: 10px;
  background-color: var(--color-less-dark-grey);
  span {
    padding-right: 5px;
    font-size: 0.8rem;
  }
`;
