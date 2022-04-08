import styled from "styled-components";
import ResponsiveContainer from "../ResponsiveContainer";
import {
  FillDiv,
  CenteredFlexColumnDiv,
  Input,
  CenteredFlexRowDiv,
  FlexDiv,
  Select,
  Option,
  buttonAnim,
} from "../../Styles/StyledComponents";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { countryData } from "./data/states-provinces";
import { SIZES } from "../../Styles/constants";
import { completeSignup } from "./userHelpers";

const FirstLogin = () => {
  //TODO: make this responsive
  //TODO: onsubmit redirect. maybe change signup flow so form is requested before values first submitted to db..?
  const [regions, setRegions] = useState([]);
  const { user } = useAuth0();

  return (
    <Wrapper>
      <ResponsiveContainer heading={"Welcome!"}>
        <Content>
          <Signup
            onSubmit={(ev) => {
              ev.preventDefault();
              completeSignup(ev);
            }}
          >
            <InputColumn style={{ gap: "10px" }}>
              <InputRow>
                <InputColumn style={{ width: "70%" }}>
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    defaultValue={user?.given_name}
                  />
                </InputColumn>
                <InputColumn style={{ width: "30%" }}>
                  <Label htmlFor="middleName">Middle Initial</Label>
                  <Input
                    id="middleName"
                    name="middleName"
                    type="text"
                    style={{ textAlign: "center" }}
                  />
                </InputColumn>
              </InputRow>
              <InputRow>
                <InputColumn>
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    defaultValue={user?.family_name}
                  />
                </InputColumn>
              </InputRow>
              <InputRow>
                <InputColumn>
                  <Label htmlFor="birthdate">Birthdate</Label>
                  <Input id="birthdate" name="birthdate" type="date" />
                </InputColumn>
                <InputColumn>
                  <Label htmlFor="gender">Gender Identity</Label>
                  <Select id="gender" name="gender" defaultValue={"default"}>
                    <DefaultOption key={"default"} value={null}>
                      Select
                    </DefaultOption>
                    <Option value="M">Man</Option>
                    <Option value="F">Woman</Option>
                    <Option value="NB">Non-Binary</Option>
                    <Option value="NS">Prefer not to say</Option>
                  </Select>
                </InputColumn>
              </InputRow>
              <InputRow>
                <InputColumn>
                  <Label htmlFor="email">E-mail address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={user?.email}
                  />
                </InputColumn>
              </InputRow>
              <InputRow>
                <InputColumn>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" type="text" />
                </InputColumn>
              </InputRow>
              <InputRow>
                <InputColumn>
                  <Label htmlFor="country" type="text">
                    Country
                  </Label>
                  <Select
                    id="country"
                    name="country"
                    defaultValue={"default"}
                    onChange={(ev) => {
                      setRegions(
                        countryData.find((el) => {
                          return el.abbreviation === ev.target.value;
                        }).states
                      );
                    }}
                  >
                    <DefaultOption key={"default"} value={null}>
                      Select
                    </DefaultOption>
                    {countryData.map(({ name, abbreviation }) => {
                      return (
                        <Option key={abbreviation} value={abbreviation}>
                          {name}
                        </Option>
                      );
                    })}
                  </Select>
                </InputColumn>
                <InputColumn>
                  <Label htmlFor="region" type="text">
                    State/Province
                  </Label>
                  <Select id="region" name="region" defaultValue={"default"}>
                    <DefaultOption key={"default"} value={null}>
                      Select
                    </DefaultOption>
                    {regions.map(({ name, abbreviation }) => {
                      return (
                        <Option key={abbreviation} value={abbreviation}>
                          {name}
                        </Option>
                      );
                    })}
                  </Select>
                </InputColumn>
              </InputRow>
            </InputColumn>
            <InputRow>
              <Submit type="submit" id="submit" value="Submit" />
            </InputRow>
          </Signup>
        </Content>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default FirstLogin;

const Wrapper = styled(FillDiv)`
  background-color: var(--color-dark-blue);
  width: 100%;
`;

const Content = styled(CenteredFlexColumnDiv)`
  width: 100%;
  height: 100%;
  padding: ${SIZES.universalPadding}px;
`;

const Signup = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: 10px;
  border-radius: ${SIZES.borderRadius}px;
`;

const Label = styled.label`
  padding: 0px 3px;
  font-size: 10px;
  text-transform: uppercase;
`;

const InputColumn = styled(CenteredFlexColumnDiv)`
  width: 100%;
  align-items: flex-start;
`;

const InputRow = styled(FlexDiv)`
  width: 100%;
  justify-content: space-between;
  gap: 7.5px;
`;

const DefaultOption = styled(Option)``;

const Submit = styled(Input)`
  margin-top: 15px;
  font-size: 18px;
  padding: 10px;
  box-shadow: none;
  ${buttonAnim}
`;
