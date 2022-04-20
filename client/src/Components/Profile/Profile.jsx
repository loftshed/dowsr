import styled from "styled-components";
import { centeredFlexColumn, fillSpace } from "../../styling/sharedstyles";
import { SIZES } from "../../styling/constants";
import ResponsiveContainer from "../../styling/ResponsiveContainer";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import { getUserByUsername } from "../Auth/helpers";
import LoadingSpinner from "../../styling/LoadingSpinner";
import { useParams } from "react-router-dom";
import { handleGetUserContributions, handleGetUserPending } from "./helpers";
import ContributionsBar from "./components/ContributionsBar";
import RegDate from "./components/RegDate";
import { FollowBar } from "./components/FollowBar";
import LocationBar from "./components/LocationBar";
import MessageBar from "./components/MessageBar";
import Avatar from "./components/Avatar";

// TODO: Make this state less shitty

const Profile = () => {
  const { loggedInUser } = useContext(AppContext);
  const [viewedProfile, setViewedProfile] = useState();
  const params = useParams();
  // On load, get the profile of the username in the params.
  // If there are no params, setViewedProfile to the the locallyStoredUser
  const isOwnProfile =
    loggedInUser.username === params.username || !params.username;

  useEffect(() => {
    (async () => {
      try {
        let amendedData;
        if (!params.username) {
          const { pendingReview } = handleGetUserPending(loggedInUser._id);
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
  }, [params.username]);

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
  outline: 1px solid var(--color-super-dark-grey);
  border-radius: ${SIZES.borderRadius}px;
`;

const ProfileSplash = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 150px;
  background-image: url("/bg.jpg");
  border-top-left-radius: ${SIZES.borderRadius}px;
  border-top-right-radius: ${SIZES.borderRadius}px;
  background-size: cover;
  @media (min-width: 450px) {
    height: 250px;
  }
`;

const UserDetails = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  height: 100%;
  border-radius: ${SIZES.borderRadius}px;
  border-top: 1px solid var(--color-super-dark-grey);
`;

const DetailsHeading = styled.div`
  background-color: var(--color-darkest-grey);
  padding: 0 ${SIZES.universalPadding}px;
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
  background-color: var(--color-super-dark-grey);
  border-bottom-left-radius: ${SIZES.borderRadius}px;
  border-bottom-right-radius: ${SIZES.borderRadius}px;
  height: 100%;
  width: 100%;
  @media (min-width: 450px) {
    font-size: 28px;
  }
`;
