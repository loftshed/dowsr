import styled from "styled-components/macro";
import ResponsiveContainer from "../../styling/ResponsiveContainer";
import { SIZES } from "../../styling/constants";
import { centeredFlexColumn } from "../../styling/sharedstyles";

const Error = () => {
  return (
    <ResponsiveContainer heading={"Error"}>
      <ErrorContainer>
        <ErrorMessage>
          Something went wrong 😔 Please refresh the page to try again.
        </ErrorMessage>
      </ErrorContainer>
    </ResponsiveContainer>
  );
};

export default Error;

const ErrorContainer = styled.div`
  ${centeredFlexColumn}
  padding: ${SIZES.universalPadding}px;
  border-radius: ${SIZES.borderRadius}px;
  width: 100%;
  height: 100%;
  gap: 15px;
`;

const ErrorMessage = styled.h2`
  text-align: center;
`;
