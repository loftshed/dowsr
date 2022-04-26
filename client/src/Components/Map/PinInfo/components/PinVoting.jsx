import styled from "styled-components";
import { useContext, useState } from "react";
import { MappingContext } from "../../MappingContext";
import { ThumbsDownIcon, ThumbsUpIcon } from "../../../../styling/react-icons";
import PinVotingButton from "./PinVotingButton";
import { centeredFlexRow } from "../../../../styling/sharedstyles";

const PinVoting = ({ isOwnPin }) => {
  const { popupInfo } = useContext(MappingContext);
  const [pinFeedback, setPinFeedback] = useState({
    likedByIds: popupInfo?.likedByIds,
    dislikedByIds: popupInfo?.dislikedByIds,
  });

  return (
    <PinVotingWrapper>
      <PinVotingButton
        value={"like"}
        isOwnPin={isOwnPin}
        setPinFeedback={setPinFeedback}
        pinFeedback={pinFeedback}
      >
        <ThumbsUpIcon />
        <span>{pinFeedback?.likedByIds.length}</span>
      </PinVotingButton>
      <PinVotingButton
        value={"dislike"}
        isOwnPin={isOwnPin}
        setPinFeedback={setPinFeedback}
        pinFeedback={pinFeedback}
      >
        <ThumbsDownIcon />
        <span>{pinFeedback?.dislikedByIds.length}</span>
      </PinVotingButton>
    </PinVotingWrapper>
  );
};
export default PinVoting;

const PinVotingWrapper = styled.div`
  width: 100%;
  ${centeredFlexRow}
  gap: 5px;

  border-radius: 4px;
`;
