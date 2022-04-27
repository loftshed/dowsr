import { useContext, useState } from "react";
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
import TimeSelector from "./NewPinTimeSelector";
import dayjs from "dayjs";

const NewWarningPinForm = ({ handleSubmitPin }) => {
  const [timeSeen, setTimeSeen] = useState(dayjs().format());
  const { setClickedLocation, clickedLocation } = useContext(MappingContext);
  const { loggedInUser } = useContext(AppContext);

  return (
    <NewWarningPinWrapper>
      {" "}
      <ModalForm
        autoComplete="off"
        onSubmit={(ev) => {
          ev.preventDefault();
          if (ev.target.desc !== "") {
            handleSubmitPin(
              ev,
              clickedLocation,
              loggedInUser,
              timeSeen,
              ev.target.desc.value
            );
          } else {
            console.log("Please select a pin type");
          }
        }}
      >
        <InputRow>
          <InputColumn>
            <InputHeading>What's going on?</InputHeading>
            <Checkboxes>
              <InputColumn>
                <CheckItem>
                  <Checkbox
                    type="radio"
                    value="hazard"
                    key="hazard"
                    id="hazard"
                  />
                  <span>⚠️</span>
                </CheckItem>
                <label htmlFor="hazard">hazard</label>
              </InputColumn>
              <InputColumn>
                <CheckItem>
                  <Checkbox
                    type="radio"
                    value="police"
                    key="police"
                    id="police"
                  />
                  <span>🚔</span>
                </CheckItem>
                <label htmlFor="police">ticketing</label>
              </InputColumn>
              <InputColumn style={{ justifyContent: "space-between" }}>
                <TimeSelector
                  labelValue={"Time"}
                  value={timeSeen}
                  setValue={setTimeSeen}
                  warning={true}
                />
                <label htmlFor="time">Seen at</label>
              </InputColumn>
            </Checkboxes>
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
          <InputHeading>Describe the situation</InputHeading>
          <ModalInput id="desc" key="desc" type="text" />
        </InputColumn>
        <ModalSubmit />
      </ModalForm>
    </NewWarningPinWrapper>
  );
};

export default NewWarningPinForm;

const Subheading = styled.div`
  ${centeredFlexRow}
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 10px;
  padding: 2px;
`;

const NewWarningPinWrapper = styled.div`
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
  gap: 10px;
  label {
    padding-top: 2px;
    font-size: 10px;
    line-height: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
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
  width: 60px;
  span {
    font-size: 20px;
  }
`;
