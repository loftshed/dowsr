import styled from "styled-components";
import {
  BodyPadding,
  CenteredFlexColumnDiv,
  FlexDiv,
} from "../styles/StyledComponents";

import data from "../dummydata/data";

const Profile = () => {
  const { _id, givenName, surname, gender, city, region, country, avatarUrl } =
    data;

  return (
    <Wrapper>
      <Content>
        <ProfileContainer>
          <Avatar src={avatarUrl} />
          test
        </ProfileContainer>
      </Content>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled(BodyPadding)`
  background-color: var(--color-dark-blue);
`;

const Content = styled(CenteredFlexColumnDiv)`
  width: 100%;
  height: 100%;
`;

const ProfileContainer = styled(CenteredFlexColumnDiv)`
  background-color: var(--color-dark-grey);
  height: 300px;
  width: 200px;
`;

const Avatar = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 400px;
`;
