import styled from "styled-components";
import {
  CenteredFlexColumnDiv,
  CenteredFlexRowDiv,
  FillDiv,
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

  //STRETCH: - nothing in backend for this yet.
  //const handleFollowUser = (userId) => {};

  // dummy data for now //TODO: set it up so profile can be used to retrieve different user profiles as well ..! no way to start convo yet
  const viewedProfile = 123;

  const handleMsgUser = (idA, idB, message) => {};

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
      <InnerContainer>
        <InnerContainerLiner>
          <ProfileSplash>
            <Avatar src={avatarUrl} />
          </ProfileSplash>
          <UserDetails>
            <DetailsHeading style={{ gap: "10px" }}>
              <h3>{username}</h3>
              <Flag code={country} height={16} />
            </DetailsHeading>

            <Details>
              <Location>{`${city}, ${region}`}</Location>
              <Actions>
                <TextButton
                  onClick={handleMsgUser(loggedInUser._id, viewedProfile, "👋")}
                >
                  Send Message
                </TextButton>
              </Actions>
              <DetailList>
                <li>{contributions} followers</li>
                <li>{contributions} contributions</li>
                <li>Member since {dayjs(regDate).format("MMMM YYYY")}</li>
              </DetailList>
            </Details>
          </UserDetails>
        </InnerContainerLiner>
        {/* <ProfileChin>
          <LogoutButton />
        </ProfileChin> */}
      </InnerContainer>
    </ResponsiveContainer>
  );
};

export default Profile;

const Actions = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  padding: 3px 20px;
  justify-content: flex-end;
  background-color: var(--color-less-dark-grey);

  button {
    border-radius: unset;
    padding: 2px 5px;
    background-color: var(--color-darkest-grey);
  }
`;

const InnerContainer = styled(FillDiv)`
  user-select: none;
  padding: 5px;
  flex-direction: column;
`;

const InnerContainerLiner = styled(FillDiv)`
  flex-direction: column;
  outline: 1px solid var(--color-super-dark-grey);
  border-radius: ${SIZES.borderRadius}px;
`;

const ProfileChin = styled.div`
  background-color: var(--color-less-dark-grey);
  border-bottom-left-radius: ${SIZES.borderRadius}px;
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  /* padding: 5px ${SIZES.universalPadding}px; */
  width: 100%;
`;

const Location = styled.div`
  background-color: var(--color-less-dark-grey);
  padding-left: ${SIZES.universalPadding}px;
  width: 100%;
  font-size: 14px;
  @media (min-width: 450px) {
    padding: 2.5px ${SIZES.leftPaddingLrg}px;
    font-size: 20px;
  }
  border-top: 1px solid var(--color-super-dark-grey);
  border-bottom: 1px solid var(--color-super-dark-grey);
`;

const UserDetails = styled(CenteredFlexColumnDiv)`
  flex-grow: 1;
  width: 100%;
  border-radius: ${SIZES.borderRadius}px;
  border-top: 1px solid var(--color-super-dark-grey);
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
  box-shadow: 1.8px 1.6px 4px rgba(0, 0, 0, 0.02),
    4.3px 3.8px 9.6px rgba(0, 0, 0, 0.028),
    8.1px 7.1px 18.2px rgba(0, 0, 0, 0.035),
    14.5px 12.7px 32.4px rgba(0, 0, 0, 0.042),
    27.2px 23.8px 60.6px rgba(0, 0, 0, 0.05),
    65px 57px 145px rgba(0, 0, 0, 0.07);
  outline: 1px solid var(--color-super-dark-grey);
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
    font-size: 22px;
    h3 {
      font-size: 28px;
    }
  }
`;

const Details = styled.div`
  background-color: var(--color-super-dark-grey);
  border-bottom-left-radius: ${SIZES.borderRadius}px;
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  flex-grow: 1;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  @media (min-width: 450px) {
    font-size: 28px;
  }
`;

const DetailList = styled.div`
  padding: unset;
  padding: 25px;
`;

const BurgerButton = styled(TextButton)`
  padding: 5px;
`;
