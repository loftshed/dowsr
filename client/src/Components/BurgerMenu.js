import styled from "styled-components";
import { SIZES } from "../Styling/constants";
import { centeredFlexColumn, fillSpace } from "../Styling/StyledComponents";
import LogoutButton from "./Auth/LogoutButton";

const BurgerMenu = ({ show }) => {
  return (
    <BurgerWrapper show={show}>
      <Content>
        <InnerContainer>
          <LogoutButton />
        </InnerContainer>
      </Content>
    </BurgerWrapper>
  );
};

export default BurgerMenu;

const BurgerWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 150px;
  bottom: ${(props) => (props.show ? "60px" : "-500px")};
  right: 0px;
  background-color: var(--color-darkest-grey);
  border-radius: ${SIZES.borderRadius}px;
  outline: 1px solid var(--color-super-dark-grey);
  transition: 0.2s all ease;
  opacity: ${(props) => (props.show ? "100%" : "0%")};
`;

const Content = styled.div`
  ${fillSpace};
  padding: 5px;
`;

const InnerContainer = styled.div`
  ${fillSpace};
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  border-radius: ${SIZES.borderRadius}px;
  background-color: var(--color-super-dark-grey);
  outline: 1px solid var(--color-super-dark-grey);
  padding: 5px;
`;
