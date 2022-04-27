import styled from "styled-components/macro";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayJsUtils from "@date-io/dayjs";

const TimeSelector = () => {
  return (
    <MuiPickersUtilsProvider utils={DayJsUtils}>
      <TimePicker />
    </MuiPickersUtilsProvider>
  );
};

export default TimeSelector;

const TimeSelectorWrapper = styled.div``;
