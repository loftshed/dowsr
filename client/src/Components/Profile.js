import styled from "styled-components";
import {
  FillDiv,
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  FlexDiv,
} from "../styles/StyledComponents";
import ResponsiveContainer from "./ResponsiveContainer";
import { SIZES } from "../styles/constants";
import data from "../dummydata/data";

const Profile = () => {
  const { username, city, region, joinDate, contributions } = data;

  //TODO: button to edit profile!
  //FIXME: icon colors, svg fill not highlighting entire icon

  return (
    <ResponsiveContainer>
      <Avatar src="/avatar.jpg" />
      <UserDetails>
        <DetailsHeading>
          <h3>@{username}</h3>
        </DetailsHeading>
        <DetailList>
          <p>{city + ", " + region}</p>
          <p>{contributions} contributions</p>
          <p>Member since {joinDate}</p>
        </DetailList>
      </UserDetails>
    </ResponsiveContainer>
  );
};

export default Profile;

const UserDetails = styled(CenteredFlexColumnDiv)`
  flex-grow: 1;
  width: 100%;
  height: 50%;
  background-color: var(--color-dark-grey);
  border-radius: ${SIZES.borderRadius}px;
`;

const Avatar = styled.img`
  border-top-left-radius: ${SIZES.borderRadius}px;
  border-top-right-radius: ${SIZES.borderRadius}px;
`;

const DetailsHeading = styled(CenteredFlexRowDiv)`
  background-color: var(--color-darkest-grey);
  height: 50px;
  width: 100%;
`;

const DetailList = styled(CenteredFlexColumnDiv)`
  align-items: flex-start;
  flex-grow: 1;
`;
