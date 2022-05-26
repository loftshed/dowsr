import styled from "styled-components/macro";
import { Label } from "../sharedstyles";
import {
  Select,
  Option,
  centeredFlexColumn,
} from "../../../styling/sharedstyles";
import { countryData } from "../data/states-provinces";

const CountrySelect = ({ setRegions }) => {
  return (
    <CountrySelectWrapper>
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
    </CountrySelectWrapper>
  );
};

export default CountrySelect;

const CountrySelectWrapper = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  align-items: flex-start;
`;

const DefaultOption = styled(Option)``;
