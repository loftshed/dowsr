import styled from "styled-components";
import { CenteredFlexColumnDiv, FlexDiv } from "../../Styling/StyledComponents";
import { SIZES } from "../../Styling/constants";

const ThreadTile = ({ user, children }) => {
  return (
    <TileWrapper>
      <Heading>{user}</Heading>
      <Body>{children}</Body>
    </TileWrapper>
  );
};

export default ThreadTile;

const TileWrapper = styled(CenteredFlexColumnDiv)`
  width: 100%;
  height: 80px;
  background-color: var(--color-darkest-grey);
  border-radius: 5px;

  border: 1px solid var(--color-extra-medium-grey);
`;

const Heading = styled(FlexDiv)`
  font-family: Karla;
  font-size: 14px;
  width: 100%;
  padding: 0px 5px;
  background-color: var(--color-almost-darkest-blue);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const Body = styled(FlexDiv)`
  padding: 0px 5px;
  width: 100%;
  height: 100%;
  font-size: 14px;
`;
