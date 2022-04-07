import styled from "styled-components";
import {
  FlexDiv,
  CenteredFlexRowDiv,
  CenteredFlexColumnDiv,
  FillDiv,
} from "../styles/StyledComponents";
import { SIZES } from "../styles/constants";

const Header = () => {
  return (
    <HeaderWrapper>
      <Content>
        <Logo>dowsr</Logo>
      </Content>
    </HeaderWrapper>
  );
};

export default Header;
const HeaderWrapper = styled(FillDiv)`
  justify-content: center;
  background-color: var(--color-med-blue);
  box-shadow: 2px 2px 2px 10px var(--color-green);
  z-index: 5;
  height: ${SIZES.lrgHeader}px;
  @media (max-width: ${SIZES.widthMin}px) {
    height: 50px;
  }
`;

const Content = styled(FlexDiv)`
  align-items: flex-end;
  /* border-left: 2px solid var(--color-green);
  border-right: 2px solid var(--color-green); */
  padding: 0px var(--content-inner-padding-h);
  /* height: var(--header-height); */
  width: 100%;
  @media (min-width: ${SIZES.widthMax}px) {
    width: ${SIZES.widthMax}px;
  }
`;

const Logo = styled.h1`
  @media (max-width: ${SIZES.widthMin}px) {
    font-size: 35px;
  }
`;
