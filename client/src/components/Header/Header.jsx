import styled from "styled-components/macro";
import { fillSpace } from "../../styling/sharedstyles";

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

const HeaderWrapper = styled.div`
  ${fillSpace}
  user-select: none;
  justify-content: center;
  align-items: center;
  background-color: #05181e;
  box-shadow: 2px 2px 2px 10px ${(props) => props.theme.colors.teal};
  z-index: 5;
  height: ${(props) => props.theme.sizes.lrgHeader}px;
  @media (max-width: ${(props) => props.theme.sizes.widthMin}px) {
    height: 50px;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: flex-end;
  /* border-left: 2px solid ${(props) => props.theme.colors.teal};
  border-right: 2px solid ${(props) => props.theme.colors.teal}; */
  padding: 0px ${(props) => props.theme.sizes.universalPadding}px;
  width: 100%;
  @media (min-width: ${(props) => props.theme.sizes.widthMax}px) {
    width: ${(props) => props.theme.sizes.widthMax}px;
  }
`;

const Logo = styled.h1`
  letter-spacing: 2px;
  @media (max-width: ${(props) => props.theme.sizes.widthMin}px) {
    font-size: 35px;
  }
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
`;
