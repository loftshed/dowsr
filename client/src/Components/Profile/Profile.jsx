import styled from "styled-components";
import {
  centeredFlexColumn,
  centeredFlexRow,
  fillSpace,
} from "../../styling/sharedstyles";
import { SIZES } from "../../styling/constants";
import ResponsiveContainer from "../../styling/ResponsiveContainer";
import { useEffect, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AppContext } from "../../AppContext";
import { getUserByUsername } from "../Auth/helpers";
import LoadingSpinner from "../../styling/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import { handleGetUserContributions, handleGetUserPending } from "./helpers";
import ContributionsBar from "./components/ContributionsBar";
import RegDate from "./components/RegDate";
import { FollowBar } from "./components/FollowBar";
import LocationBar from "./components/LocationBar";
import MessageBar from "./components/MessageBar";

// TODO: Make this state less shitty

const Profile = () => {
  const { loggedInUser, viewedProfile, setViewedProfile } =
    useContext(AppContext);
  const { isLoading } = useAuth0();
  const navigate = useNavigate();
  const params = useParams();
  const isOwnProfile = loggedInUser.username === params.username;
  console.log(isOwnProfile);

  const handleGetProfile = async (username) => {
    try {
      if (!username) {
        setViewedProfile(loggedInUser);
        return;
      }
      const { data } = await getUserByUsername(username);
      setViewedProfile(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!params.username) {
      handleGetProfile(loggedInUser.username);
      return;
    } else {
      handleGetProfile(params.username);
    }
  }, [params.username, loggedInUser.username]);

  useEffect(() => {
    (async () => {
      let response;
      let pending;
      if (isOwnProfile) {
        response = await handleGetUserContributions(loggedInUser.username);
        pending = await handleGetUserPending(loggedInUser._id);
      } else {
        response = await handleGetUserContributions(viewedProfile.username);
        pending = await handleGetUserPending(viewedProfile._id);
      }
      setViewedProfile({
        ...viewedProfile,
        submissionsByType: response.submissionsByType,
        submissionsPending: pending.pendingReview,
      });
    })();
  }, [params.username, loggedInUser.username]);

  if (isLoading || viewedProfile.submissionsByType === undefined)
    return (
      <ResponsiveContainer>
        <LoadingSpinner size={60} />
      </ResponsiveContainer>
    );

  if (!viewedProfile) return null;
  const {
    username,
    city,
    country,
    region,
    avatarUrl,
    contributions,
    regDate,
    _id,
    submissionsByType,
    submissionsPending,
  } = viewedProfile;

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
                  submissionsByType={submissionsByType}
                  submissionsPending={submissionsPending}
                  contributions={contributions}
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
    right: 40px;
  }
  box-shadow: 1.8px 1.6px 4px rgba(0, 0, 0, 0.02),
    4.3px 3.8px 9.6px rgba(0, 0, 0, 0.028),
    8.1px 7.1px 18.2px rgba(0, 0, 0, 0.035),
    14.5px 12.7px 32.4px rgba(0, 0, 0, 0.042),
    27.2px 23.8px 60.6px rgba(0, 0, 0, 0.05),
    65px 57px 145px rgba(0, 0, 0, 0.07);
  outline: 1px solid var(--color-super-dark-grey);
  background-color: var(--color-pink);
`;

const UserDetails = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  height: 100%;
  border-radius: ${SIZES.borderRadius}px;
  border-top: 1px solid var(--color-super-dark-grey);
`;

const DetailsHeading = styled.div`
  ${centeredFlexRow}
  justify-content: flex-start;
  background-color: var(--color-darkest-grey);
  padding: ${SIZES.universalPadding}px;
  gap: 10px;
  height: 50px;
  width: 100%;
  @media (min-width: 450px) {
    padding: 40px;
    height: 75px;
    font-size: 22px;
    h3 {
      font-size: 34px;
    }
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
