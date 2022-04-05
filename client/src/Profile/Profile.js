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
`;

const Avatar = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 400px;
`;
