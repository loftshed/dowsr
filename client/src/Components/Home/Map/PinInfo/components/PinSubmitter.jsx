import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 5px;
  border-radius: 4px;
  border: none;
  line-height: 10px;
  background-color: var(--color-less-dark-grey);
  width: 100%;
  gap: 5px;
  transition: all ease 0.1s;
  border: 1px solid var(--color-super-dark-grey);

  span {
    pointer-events: none;
    font-size: 14px;
    color: var(--color-teal);
  }
`;
