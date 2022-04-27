// import styled from "styled-components/macro";
import { styled } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import dayjs from "dayjs";

const TimeSelector = ({ labelValue }) => {
  const [value, setValue] = useState(dayjs().format());

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledTimePicker
        id={labelValue + "TimePicker"}
        label={labelValue}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <StyledTextField {...params} />}
        ampm={false}
      />
    </LocalizationProvider>
  );
};

export default TimeSelector;

const StyledTextField = styled(TextField)`
  height: 20px;
  margin: 0px;
  input {
    text-align: center;
    color: ${(props) => props.theme.colors.lightGrey};
    padding: 5px;
    width: 60px;
    font-weight: 600;
  }
  label {
    color: ${(props) => props.theme.colors.superDarkGrey};
    text-transform: uppercase;
    font-size: 10px;
    font-weight: 600;
    transform: translate(14px, -5px);
  }
`;

const StyledTimePicker = styled(MobileTimePicker)``;
