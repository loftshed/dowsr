import styled from "styled-components/macro";
import ResponsiveContainer from "../../styling/ResponsiveContainer";
import {
  Input,
  Select,
  Option,
  buttonAnim,
  fillSpace,
  centeredFlexColumn,
} from "../../styling/sharedstyles";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { countryData } from "./data/states-provinces";
import { addNewUser } from "./helpers";
import { AppContext } from "../AppContext";

const FirstLogin = () => {
  //TODO: make this responsive
  //TODO: highlight missing required fields on submit
  const { setFirstLogin } = useContext(AppContext);
  const [regions, setRegions] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth0();

  return (
    <Wrapper>
      <ResponsiveContainer heading={"Welcome!"}>
        <Content>
          <p style={{ fontSize: "12px" }}>Please complete your registration.</p>
          <Signup
            onSubmit={async (ev) => {
              ev.preventDefault();
              const { success } = await addNewUser(ev, user);
              if (success) {
                //TODO: LOADING SPINNER... success!
                setFirstLogin(false);
                navigate("/profile");
              } else {
                //TODO: LOADING SPINNER... failure :(
                navigate("/error");
              }
            }}
          >
            <InputColumn style={{ gap: "5px" }}>
              <InputRow>
                <InputColumn style={{ width: "70%" }}>
                  <Label htmlFor="firstName">First name*</Label>
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
                  <Label htmlFor="lastName">Last name*</Label>
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

const Content = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.sizes.universalPadding}px;
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
  text-transform: uppercase;
`;

const InputColumn = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  align-items: flex-start;
`;

const InputRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 7.5px;
`;

const DefaultOption = styled(Option)``;

const Submit = styled(Input).attrs({
  type: "submit",
  id: "submit",
  value: "Submit",
})`
  margin-top: 15px;
  font-size: 18px;
  padding: 10px;
  box-shadow: none;
  ${buttonAnim}
`;
