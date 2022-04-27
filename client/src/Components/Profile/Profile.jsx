import styled from "styled-components";
import { centeredFlexColumn, fillSpace } from "../../styling/sharedstyles";
import ResponsiveContainer from "../../styling/ResponsiveContainer";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../AppContext";
import { getUserByUsername } from "../Auth/helpers";
import LoadingSpinner from "../../styling/LoadingSpinner";
import { useParams } from "react-router-dom";
import { handleGetUserPending } from "./helpers";
import ContributionsBar from "./components/ContributionsBar";
import RegDate from "./components/RegDate";
import { FollowBar } from "./components/FollowBar";
import LocationBar from "./components/LocationBar";
import MessageBar from "./components/MessageBar";
import Avatar from "./components/Avatar";

// TODO: Make this state less shitty

const Profile = () => {
  const { loggedInUser } = useContext(AppContext); // Get loggedInUser from AppContext
  const [viewedProfile, setViewedProfile] = useState();
  const params = useParams();
  const isOwnProfile = // If the loggedInUser's username is the same as the username in params, or params are empty,
    loggedInUser.username === params.username || !params.username; // we are viewing our own profile.

  useEffect(() => {
    (async () => {
      try {
        let amendedData;
        if (!params.username && loggedInUser) {
          const { pendingReview } = await handleGetUserPending(
            loggedInUser._id
          );
          amendedData = { ...loggedInUser, pendingReview: pendingReview };
          setViewedProfile(amendedData);
          return;
        }
        const { data } = await getUserByUsername(params.username);
        const { pendingReview } = await handleGetUserPending(data._id);
        amendedData = { ...data, pendingReview: pendingReview };
        setViewedProfile(amendedData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params.username, loggedInUser]);

  if (!viewedProfile) {
    return (
      <ResponsiveContainer>
        <LoadingSpinner size={60} />
      </ResponsiveContainer>
    );
  }

  const {
    _id,
    regDate,
    contributions,
    contributionsByType,
    pendingReview,
    username,
    city,
    country,
    region,
    avatarUrl,
  } = viewedProfile;

  return (
    <ResponsiveContainer>
      <InnerContainer>
        <InnerContainerLiner>
          <ProfileSplash>
            <Avatar avatarUrl={avatarUrl} />
          </ProfileSplash>
          <UserDetails>
            <DetailsHeading>
              <Username>{username}</Username>
            </DetailsHeading>
            <Details>
              <div>
                <LocationBar country={country} city={city} region={region} />
                <FollowBar
                  loggedInUser={loggedInUser}
                  _id={_id}
                  viewedProfile={viewedProfile}
                  isOwnProfile={isOwnProfile}
                />
              </div>
              <div>
                <RegDate regDate={regDate} />
                <ContributionsBar
                  contributionsByType={contributionsByType}
                  contributions={contributions}
                  pendingReview={pendingReview}
                />
                <MessageBar
                  loggedInUser={loggedInUser}
                  _id={_id}
                  isOwnProfile={isOwnProfile}
                />
              </div>
            </Details>
          </UserDetails>
        </InnerContainerLiner>
      </InnerContainer>
    </ResponsiveContainer>
  );
};

export default Profile;

const InnerContainer = styled.div`
  ${fillSpace}

  user-select: none;
  padding: 5px;
  flex-direction: column;
`;

const InnerContainerLiner = styled.div`
  display: flex;
  max-height: 100%;
  height: 100%;
  width: 100%;
  flex-direction: column;
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
`;

const ProfileSplash = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 150px;
  background-image: url("/bg.jpg");
  border-top-left-radius: ${(props) => props.theme.sizes.borderRadius}px;
  border-top-right-radius: ${(props) => props.theme.sizes.borderRadius}px;
  background-size: cover;
  @media (min-width: 450px) {
    height: 250px;
  }
`;

const UserDetails = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
  border-top: 1px solid ${(props) => props.theme.colors.superDarkGrey};
`;

const DetailsHeading = styled.div`
  background-color: ${(props) => props.theme.colors.darkestGrey};
  padding: 0 ${(props) => props.theme.sizes.universalPadding}px;
  width: 100%;
  @media (min-width: 450px) {
    padding: 0px 40px;
  }
`;

const Username = styled.h3`
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
  padding: 5px 0px;
  @media (min-width: 450px) {
    padding: 10px 0px;
    font-size: 40px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.superDarkGrey};
  border-bottom-left-radius: ${(props) => props.theme.sizes.borderRadius}px;
  border-bottom-right-radius: ${(props) => props.theme.sizes.borderRadius}px;
  height: 100%;
  width: 100%;
  @media (min-width: 450px) {
    font-size: 28px;
  }
`;
