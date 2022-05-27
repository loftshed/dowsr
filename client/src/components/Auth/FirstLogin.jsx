import styled from 'styled-components/macro';
import ResponsiveContainer from '../../styling/ResponsiveContainer';
import {
  Input,
  Option,
  buttonAnim,
  fillSpace,
  centeredFlexColumn,
} from '../../styling/sharedstyles';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { addNewUser } from './helpers';
import { AppContext } from '../AppContext';
import RegionSelect from './components/RegionSelect';
import CountrySelect from './components/CountrySelect';
import Birthdate from './components/Birthdate';
import GenderId from './components/GenderId';

const FirstLogin = () => {
  //TODO: make this responsive
  //TODO: highlight missing required fields on submit
  const { setFirstLogin } = useContext(AppContext);
  const [regions, setRegions] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth0();

  return (
    <Wrapper>
      <ResponsiveContainer heading={'Welcome!'}>
        <Content>
          <Heading>Please complete your registration.</Heading>
          <Signup
            onSubmit={async (ev) => {
              ev.preventDefault();
              const { success } = await addNewUser(ev, user);
              if (success) {
                setFirstLogin(false);
                navigate('/profile');
              } else {
                navigate('/error');
              }
            }}
          >
            <RegistrationFormInputs style={{ gap: '5px' }}>
              <InputRow>
                <InputColumn style={{ width: '70%' }}>
                  <Label htmlFor="firstName">First name*</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    defaultValue={user?.given_name}
                  />
                </InputColumn>
                <InputColumn style={{ width: '30%' }}>
                  <Label htmlFor="middleName">Middle Initial</Label>
                  <Input
                    id="middleName"
                    name="middleName"
                    type="text"
                    style={{ textAlign: 'center' }}
                  />
                </InputColumn>
              </InputRow>
              <InputRow>
                <InputColumn>
                  <Label htmlFor="lastName">Last name*</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    defaultValue={user?.family_name}
                  />
                </InputColumn>
                <InputColumn>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="username"
                    defaultValue={user?.nickname}
                  />
                </InputColumn>
              </InputRow>
              <InputRow>
                <Birthdate />
                <GenderId />
              </InputRow>
              <InputRow>
                <InputColumn>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" type="text" />
                </InputColumn>
              </InputRow>
              <InputRow>
                <CountrySelect setRegions={setRegions} />
                <RegionSelect regions={regions} />
              </InputRow>
            </RegistrationFormInputs>
            <InputRow>
              <Submit />
            </InputRow>
          </Signup>
        </Content>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default FirstLogin;

const Wrapper = styled.div`
  ${fillSpace}
  background-color: ${(props) => props.theme.colors.darkBlue};
  width: 100%;
`;

const Heading = styled.div``;

const Content = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.sizes.universalPadding}px;
  padding-bottom: 50px;
  background-color: #444948;

  @media (min-width: 450px) {
    width: 80%;
  }
`;

const Signup = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 10px;
  border-radius: ${(props) => props.theme.sizes.borderRadius}px;
`;

const Label = styled.label`
  padding: 0px 3px;
  font-size: 10px;
  @media (min-width: 450px) {
    font-size: 16px;
    line-height: 28px;
  }
  text-transform: uppercase;
`;

const InputColumn = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  align-items: flex-start;
`;
const RegistrationFormInputs = styled(InputColumn)`
  height: 100%;
  gap: 10px !important;
`;

const InputRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 7.5px;
`;

const Submit = styled(Input).attrs({
  type: 'submit',
  id: 'submit',
  value: 'Submit',
})`
  margin-top: 15px;
  font-size: 18px;
  padding: 10px;
  box-shadow: none;
  ${buttonAnim}
`;
