import styled from "styled-components/macro";
import { Label } from "../sharedstyles";
import {
  Select,
  Option,
  centeredFlexColumn,
} from "../../../styling/sharedstyles";

const RegionSelect = ({ regions }) => {
  return (
    <RegionSelectWrapper>
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
    </RegionSelectWrapper>
  );
};

export default RegionSelect;

const RegionSelectWrapper = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  align-items: flex-start;
`;

const DefaultOption = styled(Option)``;
