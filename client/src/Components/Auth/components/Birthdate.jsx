import styled from "styled-components/macro";
import { Label } from "../sharedstyles";
import { Input, centeredFlexColumn } from "../../../styling/sharedstyles";

const Birthdate = () => {
  return (
    <BirthdateWrapper>
      <Label htmlFor="birthdate">Birthdate</Label>
      <Input id="birthdate" name="birthdate" type="date" />
    </BirthdateWrapper>
  );
};

export default Birthdate;

const BirthdateWrapper = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  align-items: flex-start;
`;
