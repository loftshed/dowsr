import styled from "styled-components/macro";
import {
  centeredFlexColumn,
  fillSpace,
  textButtonstyling,
} from "../../../styling/sharedstyles";
import { IoIosHelpBuoy as HelpIcon } from "react-icons/io";
import { RiAlarmWarningFill as WarningIcon } from "react-icons/ri";

const ChoosePinFormType = ({ setFormType }) => {
  return (
    <ChoosePinFormTypeWrapper>
      <Heading>What kind of pin are you creating?</Heading>
      <TwoButtons>
        <Button
          onClick={(ev) => {
            ev.preventDefault();
            setFormType("resource");
          }}
        >
          <HelpIcon />
          Resource
        </Button>
        <Button
          onClick={(ev) => {
            ev.preventDefault();
            setFormType("warning");
          }}
        >
          <WarningIcon />
          Warning
        </Button>
      </TwoButtons>
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

const Heading = styled.div``;

const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  width: 100px !important;
  height: 100px !important;
  ${textButtonstyling};
  svg {
    width: 70px;
    height: 70px;
  }
`;

const TwoButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  width: 100%;
`;
