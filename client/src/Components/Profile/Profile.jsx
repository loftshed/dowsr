import styled, { css } from "styled-components";
import {
  centeredFlexColumn,
  centeredFlexRow,
  fillSpace,
  TextButton,
} from "../../styling/sharedstyles";
import {
  BurgerMenuIcon,
  HazardIcon,
  PoliceIcon,
  ToiletIcon,
  WaterIcon,
} from "../../styling/react-icons";
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
import {
  RiGlobeLine as GlobeIcon,
  RiUserFollowLine as FollowIcon,
} from "react-icons/ri";
import { SendIcon } from "../../styling/react-icons";

//FIXME: Literally everything is a disaster but I am in a mega super rush
//TODO: Redesign this component from the ground up after all other features are complete

const Profile = () => {
  const { loggedInUser, viewedProfile, setViewedProfile } =
    useContext(AppContext);
  const { isLoading } = useAuth0();
  const navigate = useNavigate();
  const params = useParams();
  const isOwnProfile = loggedInUser.username === params.username;

  const handleGetProfile = async (username) => {
    if (!username) {
      setViewedProfile(loggedInUser);
      return;
    }
    const { data } = await getUserByUsername(username);
    setViewedProfile(data);
  };

  useEffect(() => {
    if (!params.username) {
      handleGetProfile(loggedInUser.username);
      return;
    } else {
      handleGetProfile(params.username);
    }
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
                  <ProfileButton
                    onClick={async () => {
                      const result = await startThreadWithUser(
                        loggedInUser._id,
                        _id,
                        "👋",
                        loggedInUser.username
                      );
                      navigate("/messages", { replace: true });
                    }}
                  >
                    <span>Message</span>
                    {"   "}
                    <SendIcon style={{ display: "inline" }} />
                  </ProfileButton>
                  <ProfileButton>
                    <FollowIcon style={{ display: "inline" }} />
                    {"   "}
                    <span>Follow</span>
                  </ProfileButton>
                </Item>
              )}
              <BottomContainer isOwnProfile={isOwnProfile}>
                <span style={{ fontSize: "12px", padding: "5px" }}>
                  Member since {dayjs(regDate).format("MMMM YYYY")}
                </span>
                <ItemContainer>
                  <Item style={{ justifyContent: "center" }}>
                    <span>{contributions?.length}</span> pin contribution
                    {contributions?.length === 1 ? "" : "s"}
                  </Item>
                  <Contributions>
                    <Column>
                      <Icon color={"#48cae4"}>
                        <WaterIcon />
                      </Icon>
                      <Number>2</Number>
                    </Column>
                    <Column>
                      <Icon color={"#b2967d"}>
                        <ToiletIcon />
                      </Icon>
                      <Number>2</Number>
                    </Column>
                    <Column>
                      <Icon color={"#e76f51"}>
                        <HazardIcon />
                      </Icon>
                      <Number>1</Number>
                    </Column>
                    <Column>
                      <Icon color={"#db7f8e"}>
                        <PoliceIcon />
                      </Icon>
                      <Number>6</Number>
                    </Column>
                  </Contributions>
                </ItemContainer>
              </BottomContainer>
            </Details>
          </UserDetails>
        </InnerContainerLiner>
      </InnerContainer>
    </ResponsiveContainer>
  );
};

{
  /*  */
}

export default Profile;

const Icon = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 8px;
  background-color: var(--color-less-dark-grey);
  border-radius: 50%;
  border: 2px solid ${(props) => props.color};
  svg {
    fill: ${(props) => props.color};
  }
  @media (min-width: 450px) {
    padding: 12px;
  }
`;

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

const ProfileButton = styled(TextButton)`
  border-radius: 3px;
  padding: 0px 5px;
  cursor: pointer;
  gap: 3px;
`;

const Number = styled.div`
  line-height: 12px;
`;

const Column = styled.div`
  ${centeredFlexColumn};
  gap: 7.5px;
  @media (min-width: 450px) {
    gap: 15px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const Contributions = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 15px;
  @media (min-width: 450px) {
    padding: 20px 20px 25px 20px;
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
