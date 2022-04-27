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
        <VoteAmount>{pinFeedback?.likedByIds.length}</VoteAmount>
      </PinVotingButton>
      <PinVotingButton
        value={"dislike"}
        isOwnPin={isOwnPin}
        setPinFeedback={setPinFeedback}
        pinFeedback={pinFeedback}
      >
        <ThumbsDownIcon />
        <VoteAmount>{pinFeedback?.dislikedByIds.length}</VoteAmount>
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

const VoteAmount = styled.span`
  font-weight: 800;
  border-radius: 4px;
  line-height: 11px;
  padding: 2px;
  color: #fff;
`;
