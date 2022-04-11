import styled from "styled-components";
import { FaSpinner } from "react-icons/fa";
import { CenteredFlexColumnDiv } from "../../Styling/StyledComponents";
import { rotate360 } from "../../Styling/Animations";

const LoadingSpinner = ({ size, color }) => {
  return (
    <SpinnerContainer>
      <Spinner
        style={{
          width: `${size}px`,
          height: `${size}px`,
          color: color ? color : "var(--color-medium-grey)",
        }}
      />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;

const SpinnerContainer = styled(CenteredFlexColumnDiv)`
  width: 100%;
  height: 100%;
`;

const Spinner = styled(FaSpinner)`
  width: 100px;
  animation: ${rotate360} 0.9s linear infinite;
`;
