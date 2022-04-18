import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../../AppContext";
import { MappingContext } from "../../MappingContext";
import {
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "../../../../../styling/react-icons";

import PinVotingButton from "./PinVotingButton";
import { centeredFlexRow } from "../../../../../styling/sharedstyles";

const PinVoting = ({ isOwnPin, isDefaultPin }) => {
  const [pinFeedback, setPinFeedback] = useState({});
  const { loggedInUser } = useContext(AppContext);
  const { popupInfo } = useContext(MappingContext);

  useEffect(() => {
    setPinFeedback({
      numLikes: popupInfo?.likedByIds.length,
      numDislikes: popupInfo?.dislikedByIds.length,
    });
  }, [pinFeedback.numLikes, pinFeedback.numDislikes]);

  return (
    <PinVotingWrapper>
      <PinVotingButton
        value={"like"}
        isOwnPin={isOwnPin}
        setPinFeedback={setPinFeedback}
        pinFeedback={pinFeedback}
      >
        <ThumbsUpIcon />
        <span>{pinFeedback?.numLikes}</span>
      </PinVotingButton>
      <PinVotingButton
        value={"dislike"}
        isOwnPin={isOwnPin}
        setPinFeedback={setPinFeedback}
        pinFeedback={pinFeedback}
      >
        <ThumbsDownIcon />
        <span>{pinFeedback?.numDislikes}</span>
      </PinVotingButton>
    </PinVotingWrapper>
  );
};
export default PinVoting;

const PinVotingWrapper = styled.div`
  gap: 5px;
  background-color: yellow;
`;
