import styled from "styled-components";
import ResponsiveContainer from "../../Styling/ResponsiveContainer";
import { SIZES } from "../../Styling/constants";
import { centeredFlexColumn } from "../../Styling/sharedstyles";

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
