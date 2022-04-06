import styled from "styled-components";
import {
  FillDiv,
  CenteredFlexColumnDiv,
  FlexDiv,
} from "../styles/StyledComponents";

import data from "../dummydata/data";

const Profile = () => {
  const { _id, givenName, surname, gender, city, region, country, avatarUrl } =
    data;

  //todo MAKE THIS COMPONENT GENERIC

  return (
    <Wrapper>
      <Content>
        <ProfileContainer>
          <Avatar />
          test
        </ProfileContainer>
      </Content>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled(FillDiv)`
  background-color: var(--color-dark-grey);
`;

const Content = styled(CenteredFlexColumnDiv)`
  width: 100%;
  height: 100%;
`;

const ProfileContainer = styled(CenteredFlexColumnDiv)`
  border-radius: 10px;
  background-color: var(--color-less-dark-grey);
  height: 90%;
  width: 90%;
  box-shadow: 1.8px 1.6px 4px rgba(0, 0, 0, 0.02),
    4.3px 3.8px 9.6px rgba(0, 0, 0, 0.028),
    8.1px 7.1px 18.2px rgba(0, 0, 0, 0.035),
    14.5px 12.7px 32.4px rgba(0, 0, 0, 0.042),
    27.2px 23.8px 60.6px rgba(0, 0, 0, 0.05),
    65px 57px 145px rgba(0, 0, 0, 0.07);
`;

const Avatar = styled.img`
  height: 200px;
  width: 200px;
`;
