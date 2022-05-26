import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { fakeStroke } from "../../../../styling/sharedstyles";

const PinSubmitter = ({ popupInfo, isOwnPin }) => {
  const navigate = useNavigate();
  return (
    <PinSubmitterWrapper
      key="linkToProfile"
      disabled={!popupInfo.submittedBy}
      onClick={(ev) => {
        navigate(`/profile/${popupInfo.submittedBy}`);
      }}
      isOwnPin={isOwnPin}
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 5px;
  border-radius: 4px;
  border: none;
  line-height: 10px;
  background-color: ${(props) => props.theme.colors.lessDarkGrey};
  width: 100%;
  gap: 5px;
  transition: all ease 0.1s;
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  cursor: pointer;
  span {
    pointer-events: none;
    font-size: 14px;
    color: ${(props) => props.theme.colors.lightGrey} !important;
    ${fakeStroke}
  }
  &:hover {
    outline: 1px solid ${(props) => props.theme.colors.teal};
  }
  &:active {
    outline: 1px solid ${(props) => props.theme.colors.teal};
    background-color: ${(props) => props.theme.colors.darkestBlue};
  }
`;
