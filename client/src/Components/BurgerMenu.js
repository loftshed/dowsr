import styled from "styled-components";
import { SIZES } from "../Styling/constants";
import { centeredFlexColumn, fillSpace } from "../Styling/StyledComponents";
import LogoutButton from "./Auth/LogoutButton";

const BurgerMenu = ({ show }) => {
  return (
    <BurgerWrapper show={show}>
      <Content>
        <InnerContainer>
          <div>filter by:</div>
          <div>bike shops</div>
          <div>coffee</div>
          <div>submissions</div>

          <LogoutButton />
        </InnerContainer>
      </Content>
    </BurgerWrapper>
  );
};

export default BurgerMenu;

const Boundary = styled.div``;

const BurgerWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  bottom: ${(props) => (props.show ? "35px" : "-500px")};
  right: 1px;
  background-color: var(--color-darkest-grey);
  border-radius: ${SIZES.borderRadius}px;
  outline: 1px solid var(--color-super-dark-grey);
  transition: 0.2s all ease;
  opacity: ${(props) => (props.show ? "100%" : "0%")};
  z-index: -1;
`;

const Content = styled.div`
  ${fillSpace};
  padding: 5px;
  padding-bottom: 30px;
`;

const InnerContainer = styled.div`
  ${fillSpace};
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 100px;
  background-color: var(--color-darkest-blue);
  outline: 1px solid var(--color-super-dark-grey);
  padding: 5px;
`;
