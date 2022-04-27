import { useContext } from "react";
import styled from "styled-components/macro";
import {
  centeredFlexColumn,
  textButtonstyling,
  Input,
  inputStyling,
  centeredFlexRow,
  fillSpace,
} from "../../../styling/sharedstyles";
import { AppContext } from "../../AppContext";
import { MappingContext } from "../MappingContext";
import TimePicker from "./TimePicker";

const NewResourcePinForm = ({ handleSubmitPin }) => {
  const { setClickedLocation, clickedLocation } = useContext(MappingContext);
  const { loggedInUser } = useContext(AppContext);
  return (
    <NewResourcePinWrapper>
      {" "}
      <ModalForm
        autoComplete="off"
        onSubmit={(ev) => {
          ev.preventDefault();
          if (ev.target.water.checked || ev.target.toilet.checked) {
            handleSubmitPin(ev, clickedLocation, loggedInUser);
          } else {
            console.log("Please select a pin type");
          }
        }}
      >
        <InputRow>
          <InputColumn>
            <InputHeading>What's here?</InputHeading>
            <Checkboxes>
              <CheckItem>
                <Checkbox
                  type="checkbox"
                  value="water"
                  key="water"
                  id="water"
                />
                <span>💧</span>
              </CheckItem>
              <CheckItem>
                <Checkbox
                  type="checkbox"
                  value="toilet"
                  key="toilet"
                  id="toilet"
                />
                <span>🚽</span>
              </CheckItem>
            </Checkboxes>
          </InputColumn>
          <InputColumn>
            <InputHeading>Hours</InputHeading>
            {/* <ModalInput id="hours" key="hours" type="text" autoComplete="off" /> */}
            {/* <TimePicker /> */}
          </InputColumn>
        </InputRow>
        <InputColumn>
          <InputHeading>Verify the approximate address</InputHeading>
          <ModalInput
            type="text"
            key="address"
            id="address"
            value={clickedLocation?.addressFull}
            // Using onChange, it is possible to edit a field with a value that was assigned using state.
            onChange={(ev) => {
              setClickedLocation({
                ...clickedLocation,
                addressFull: ev.currentTarget.value,
              });
            }}
          />
        </InputColumn>
        <InputColumn>
          <InputHeading>Name or Brief Description</InputHeading>
          <ModalInput id="desc" key="desc" type="text" />
        </InputColumn>
        <ModalSubmit />
      </ModalForm>
    </NewResourcePinWrapper>
  );
};

export default NewResourcePinForm;

const Subheading = styled.div`
  ${centeredFlexRow}
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 10px;
  padding: 2px;
`;

const NewResourcePinWrapper = styled.div`
  ${centeredFlexColumn}
  ${fillSpace}
  background-color: ${(props) => props.theme.colors.darkGrey};
  outline: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  border-radius: 4px;
  gap: 5px;
  padding: 10px 20px;
  text-align: center;
`;

const InputRow = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 7.5px;
`;

const InputColumn = styled.div`
  ${centeredFlexColumn}
  width: 100%;
`;

const InputHeading = styled(Subheading)`
  padding: 0px 5px;
  user-select: none;
`;

const ModalInput = styled(Input)`
  padding-left: 7.5px;
  letter-spacing: 1px;
  background-color: ${(props) => props.theme.colors.superDarkGrey};
`;

const ModalSelect = styled.select`
  ${inputStyling}
  background-color: ${(props) => props.theme.colors.superDarkGrey};
`;

const ModalSubmit = styled(Input).attrs({
  type: "submit",
  key: "submit",
  id: "submit",
})`
  all: unset;
  background-color: ${(props) => props.theme.colors.darkestGrey};
  ${textButtonstyling}
  padding: 5px 20px;
`;

const ModalForm = styled.form`
  ${centeredFlexColumn}
  gap: 7.5px;
`;

const Option = styled.option``;

const Checkboxes = styled.div`
  display: flex;
  width: 100%;
  font-size: 25px;
  padding: 0px 15px;
  gap: 10px;
`;

const Checkbox = styled.input`
  position: relative;
  all: unset;
  transition: all 0.1s ease;
  width: 18px;
  height: 18px;
  line-height: 18px;
  background-color: ${(props) => props.theme.colors.darkestGrey};
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.theme.colors.teal};
  }
  cursor: pointer;
  &:checked {
    background-color: ${(props) => props.theme.colors.teal};
    ::after {
      position: absolute;
      content: "✔";
      transform: translate(-50%);
      font-size: 15px;
      font-weight: 500;
      color: ${(props) => props.theme.colors.lightGrey};
      text-shadow: 1px 1px 1px ${(props) => props.theme.colors.pink};
      transition: all 0.1s ease;
    }
  }
`;

const CheckItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.darkestGrey};
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  border-radius: 5px;
  padding: 0px 0px 0px 5px;
  span {
    font-size: 20px;
  }
`;
