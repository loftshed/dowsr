import styled from "styled-components";
import { CenteredFlexColumnDiv, FlexDiv } from "../../Styling/StyledComponents";
import { SIZES } from "../../Styling/constants";
import { useWindowWidth } from "@react-hook/window-size";

const ThreadTile = ({ user, children }) => {
  const collapseToAvatar = useWindowWidth({ wait: 5 }) <= SIZES.widthMin;

  return (
    <TileWrapper small={collapseToAvatar}>
      {collapseToAvatar ? (
        <>
          <Avatar src="/avatar.jpg" />
        </>
      ) : (
        <>
          <Heading>{user}</Heading>
          <Body>{children}</Body>
        </>
      )}
    </TileWrapper>
  );
};

export default ThreadTile;

const Avatar = styled.img`
  width: 50px;
  border-radius: 50%;
`;

const TileWrapper = styled(CenteredFlexColumnDiv)`
  width: 100%;
  height: ${(props) => (props.small ? "fit-content" : "80px")};
  background-color: var(--color-darkest-grey);
  border-radius: ${(props) => (props.small ? "50px" : "5px")};
  border: ${(props) =>
    props.small
      ? "1.5px solid var(--color-less-dark-grey)"
      : "1px solid var(--color-super-dark-grey)"};
  /* margin: ${(props) => (props.small ? "2px" : "0px")}; */
  /* @media (max-width: 425px) {
    width: 30px;
  } */
  box-shadow: inset 0px 0px 2px var(--color-super-dark-grey);
  &:hover {
    outline: solid 1px var(--color-teal);
  }
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
