import styled from "styled-components";
import {
  FillDiv,
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  FlexDiv,
  AbsoluteDiv,
} from "../styles/StyledComponents";
import ResponsiveContainer from "./ResponsiveContainer";
import { SIZES } from "../styles/constants";
import data from "../dummydata/data";

const Profile = () => {
  const { username, city, region, joinDate, contributions } = data;

  //TODO: button to edit profile!
  //+ click profile image to magnify?
  //FIXME: icon colors, svg fill not highlighting entire icon

  return (
    <ResponsiveContainer>
      <ProfileSplash>
        <Avatar src="/avatar.jpg" />
      </ProfileSplash>
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
  /* min-height: 50%; */
  background-color: var(--color-dark-grey);
  border-radius: ${SIZES.borderRadius}px;
`;

const Avatar = styled.img`
  position: absolute;
  bottom: -75px;
  right: 20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid var(--color-darkest-grey);
  @media (min-width: 450px) {
    width: 150px;
    height: 150px;
    bottom: -100px;
    right: 50px;
  }
`;

const ProfileSplash = styled(FlexDiv)`
  position: relative;
  width: 100%;
  height: 200px;
  background-image: url("/bg.jpg");
  background-position: contain;
  border-top-left-radius: ${SIZES.borderRadius}px;
  border-top-right-radius: ${SIZES.borderRadius}px;
`;

const DetailsHeading = styled(CenteredFlexRowDiv)`
  justify-content: flex-start;
  background-color: var(--color-darkest-grey);
  padding-left: ${SIZES.universalPadding}px;
  height: 50px;
  width: 100%;
  @media (min-width: 450px) {
    padding-left: 50px;
    font-size: 22px;
  }
`;

const DetailList = styled(CenteredFlexColumnDiv)`
  align-items: flex-start;
  gap: 10px;
  flex-grow: 1;
`;