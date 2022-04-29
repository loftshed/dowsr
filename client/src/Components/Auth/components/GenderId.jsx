import styled from "styled-components/macro";
import { Label } from "../sharedstyles";
import {
  Select,
  Option,
  centeredFlexColumn,
} from "../../../styling/sharedstyles";

const GenderId = () => {
  return (
    <GenderIdWrapper>
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
    </GenderIdWrapper>
  );
};

export default GenderId;

const GenderIdWrapper = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  align-items: flex-start;
`;

const DefaultOption = styled(Option)``;
