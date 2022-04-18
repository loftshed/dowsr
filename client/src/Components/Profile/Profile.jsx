import styled, { css } from "styled-components";
import {
  centeredFlexColumn,
  centeredFlexRow,
  fillSpace,
  TextButton,
} from "../../styling/sharedstyles";

import { SIZES } from "../../styling/constants";
import ResponsiveContainer from "../../styling/ResponsiveContainer";
import { useEffect, useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Flag from "react-world-flags";
import dayjs from "dayjs";
import { AppContext } from "../../AppContext";
import { getUser, getUserByUsername } from "../Auth/helpers";
import LoadingSpinner from "../../styling/LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import { startThreadWithUser } from "../Messaging/helpers";
import { handleGetUserContributions, handleGetUserPending } from "./helpers";
import { RiGlobeLine as GlobeIcon } from "react-icons/ri";
import { SendIcon } from "../../styling/react-icons";
import Contributions from "./Contributions";
import FollowButton from "./FollowButton";
import MessageButton from "./MessageButton";
import RegDate from "./RegDate";

//FIXME: Literally everything is a disaster but I am in a mega super rush
// edit: less bad now that I moved out some shit
//TODO: Redesign this component from the ground up after all other features are complete

const Profile = () => {
  const { loggedInUser, viewedProfile, setViewedProfile } =
    useContext(AppContext);
  const { isLoading } = useAuth0();
  const navigate = useNavigate();
  const params = useParams();
  const isOwnProfile = loggedInUser.username === params.username;

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

  // TODO: Get this into main useEffect lol again yes this component is a travesty
  useEffect(() => {
    (async () => {
      const response = await handleGetUserContributions(loggedInUser.username);
      const pending = await handleGetUserPending(loggedInUser._id);
      setViewedProfile({
        ...viewedProfile,
        submissionsByType: response.submissionsByType,
        submissionsPending: pending.pendingReview,
      });
    })();
  }, [params.username, loggedInUser.username]);

  if (isLoading)
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
              <Flag code={country} height={16} />
            </DetailsHeading>
            <Details>
              <Item>
                <GlobeIcon />
                {`${city}, ${region}`}
              </Item>

              {!isOwnProfile && (
                <Item style={{ justifyContent: "space-between" }}>
                  <MessageButton loggedInUser={loggedInUser} _id={_id} />
                  <FollowButton loggedInUser={loggedInUser} _id={_id} />
                </Item>
              )}
              <BottomContainer isOwnProfile={isOwnProfile}>
                <BottomSubcontainer>
                  <div>followers: {viewedProfile.followers?.length}</div>
                  <div>following: {viewedProfile.following?.length}</div>
                </BottomSubcontainer>
                <RegDate regDate={regDate} />
                <Contributions
                  submissionsByType={submissionsByType}
                  submissionsPending={submissionsPending}
                  contributions={contributions}
                />
              </BottomContainer>
            </Details>
          </UserDetails>
        </InnerContainerLiner>
      </InnerContainer>
    </ResponsiveContainer>
  );
};

export default Profile;

const sharedDetailStyle = css`
  background-color: var(--color-less-dark-grey);
  padding: 0 ${SIZES.universalPadding}px;
  width: 100%;
  font-size: 14px;
  @media (min-width: 450px) {
    padding: 2.5px 40px;
    font-size: 20px;
  }
  border-top: 1px solid var(--color-super-dark-grey);
  border-bottom: 1px solid var(--color-super-dark-grey);
  display: flex;
`;

const InnerContainer = styled.div`
  ${fillSpace}
  user-select: none;
  padding: 5px;
  flex-direction: column;
`;

const InnerContainerLiner = styled.div`
  ${fillSpace}
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
`;

const UserDetails = styled.div`
  ${centeredFlexColumn}
  flex-grow: 1;
  width: 100%;
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

const Item = styled.div`
  gap: 3px;
  align-items: center;
  width: 100%;
  height: 30px;
  ${sharedDetailStyle}
  @media (min-width: 450px) {
    height: 40px;
    font-size: 22px;
  }
`;

const ItemContainer = styled.div`
  width: 100%;
`;

const BottomContainer = styled.div`
  justify-content: flex-end;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
  width: 100%;
  @media (min-width: 450px) {
    height: calc(100% - 80px);
  }
  ${(props) =>
    props.isOwnProfile &&
    css`
  height: calc(100% - 30px);
  @media (min-width: 450px) {
    height: calc(100% - 40px);
  `}
`;

const BottomSubcontainer = styled.div`
  ${fillSpace}
  flex-direction: column;
  padding: ${SIZES.universalPadding}px;
  @media (min-width: 450px) {
    padding: calc(${SIZES.universalPadding}px * 2);
  }
`;
