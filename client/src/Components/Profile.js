import styled from "styled-components";
import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  FlexDiv,
  TextButton,
} from "../Styling/StyledComponents";
import { BurgerMenuIcon } from "../Styling/Icons";
import { SIZES } from "../Styling/constants";
import ResponsiveContainer from "../Styling/ResponsiveContainer";

import { useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Flag from "react-world-flags";
import dayjs from "dayjs";

import { AppContext } from "../Context/AppContext";
import { getUser } from "./Auth/userHelpers";
import LogoutButton from "./Auth/LogoutButton";
import LoadingSpinner from "./Etc/LoadingSpinner";

const Profile = () => {
  const { loggedInUser } = useContext(AppContext);
  const { isLoading } = useAuth0();

  //TODO: button to edit profile!
  //TODO: embed ig feed in profile
  //TODO: add bio to profile

  if (isLoading)
    return (
      <ResponsiveContainer>
        <LoadingSpinner size={60} />
      </ResponsiveContainer>
    );

  if (!loggedInUser) return null;
  const { username, city, country, region, avatarUrl, contributions, regDate } =
    loggedInUser;

  return (
    <ResponsiveContainer>
      <ProfileSplash>
        <Avatar src={avatarUrl} />
      </ProfileSplash>
      <UserDetails>
        <DetailsHeading style={{ gap: "10px" }}>
          <h3>{username}</h3>
          <Flag code={country} height={16} />
        </DetailsHeading>

        <Location>{`${city}, ${region}`}</Location>

        <Details>
          <ul>
            <li>{contributions} followers</li>
            <li>{contributions} contributions</li>
            <li>Member since {dayjs(regDate).format("MMMM YYYY")}</li>
          </ul>
        </Details>

        <ProfileChin>
          <LogoutButton />
        </ProfileChin>
      </UserDetails>
    </ResponsiveContainer>
  );
};

export default Profile;

const ProfileChin = styled.div`
  background-color: var(--color-less-dark-grey);
  border-bottom-left-radius: ${SIZES.borderRadius}px;
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  padding: 5px ${SIZES.universalPadding}px;
  width: 100%;
`;

const Location = styled.div`
  background-color: var(--color-less-dark-grey);
  padding-left: ${SIZES.universalPadding}px;
  width: 100%;
  @media (min-width: 450px) {
    padding: 2.5px ${SIZES.leftPaddingLrg}px;
    font-size: 20px;
  }
`;

const UserDetails = styled(CenteredFlexColumnDiv)`
  flex-grow: 1;
  width: 100%;
  /* min-height: 50%; */
  /* background-color: var(--color-dark-grey); */

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
  height: 150px;
  background-image: url("/bg.jpg");
  border-top-left-radius: ${SIZES.borderRadius}px;
  border-top-right-radius: ${SIZES.borderRadius}px;
`;

const DetailsHeading = styled(CenteredFlexRowDiv)`
  justify-content: flex-start;
  background-color: var(--color-darkest-grey);
  padding-left: ${SIZES.universalPadding}px;
  gap: 10px;
  height: 50px;
  width: 100%;
  @media (min-width: 450px) {
    padding: ${SIZES.leftPaddingLrg}px;
    font-size: 22px;
    h3 {
      font-size: 28px;
    }
  }
`;

// const Details = styled(CenteredFlexColumnDiv)`
const Details = styled.ul`
  padding: ${SIZES.universalPadding}px 10px;
  flex-grow: 1;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  @media (min-width: 450px) {
    padding: ${SIZES.leftPaddingLrg}px;
    font-size: 28px;
  }
`;

const BurgerButton = styled(TextButton)`
  padding: 5px;
`;
