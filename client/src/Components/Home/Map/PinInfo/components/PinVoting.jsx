import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { MappingContext } from "../../MappingContext";
import {
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "../../../../../styling/react-icons";
import PinVotingButton from "./PinVotingButton";
import { centeredFlexRow } from "../../../../../styling/sharedstyles";
import { getPin } from "../../helpers";

const PinVoting = ({ isOwnPin }) => {
  const { popupInfo } = useContext(MappingContext);
  const [pinFeedback, setPinFeedback] = useState({
    likedByIds: popupInfo?.likedByIds,
    dislikedByIds: popupInfo?.dislikedByIds,
  });

  // useEffect(() => {}), [];

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
  ${centeredFlexRow}
  padding: 3px 6px;
  gap: 10px;
  border: 1px solid var(--color-super-dark-grey);
  background-color: var(--color-extra-medium-grey);
  border-radius: 4px;
`;
