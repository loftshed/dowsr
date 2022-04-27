import styled from "styled-components";
import { FaSpinner } from "react-icons/fa";
import { centeredFlexColumn } from "./sharedstyles";
import { rotate360 } from "./animations";

const LoadingSpinner = ({ size, color }) => {
  return (
    <SpinnerContainer>
      <Spinner
        style={{
          width: `${size}px`,
          height: `${size}px`,
          color: color ? color : "${(props) => props.theme.colors.mediumGrey}",
        }}
      />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;

const SpinnerContainer = styled.div`
  ${centeredFlexColumn}
  width: 100%;
  height: 100%;
`;

const Spinner = styled(FaSpinner)`
  width: 100px;
  animation: ${rotate360} 0.9s linear infinite;
`;
