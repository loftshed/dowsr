import styled from "styled-components/macro";
import {
  centeredFlexColumn,
  fillSpace,
  textButtonstyling,
} from "../../../styling/sharedstyles";

const ChoosePinFormType = () => {
  return (
    <ChoosePinFormTypeWrapper>
      pin form type choosin thing
      <Toggle>
        <Switch
          onClick={(ev) => {
            ev.target.offsetLeft = "100px";
          }}
        />
      </Toggle>
    </ChoosePinFormTypeWrapper>
  );
};

export default ChoosePinFormType;

const ChoosePinFormTypeWrapper = styled.div`
  ${centeredFlexColumn}
  ${fillSpace}
  background-color: ${(props) => props.theme.colors.darkGrey};
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  border-radius: 4px;
  gap: 5px;
  padding: 10px 20px;
  text-align: center;
`;

const Toggle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 120px;
  height: 60px;
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  background-color: ${(props) => props.theme.colors.lessDarkGrey};
  border-radius: 100px;
  padding: 0px 2.5px;
`;

const Switch = styled.div`
  transition: all 0.1s ease;
  position: absolute;
  width: 55px;
  height: 55px;
  border-radius: inherit;
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  background-color: ${(props) => props.theme.colors.darkestGrey};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.teal};
  }
`;
