import { memo } from "react";
import styled from "styled-components/macro";
import { CreatePinIcon } from "../../../styling/react-icons";

const NewPinIcon = ({ onClick }) => {
  return (
    <Wrapper>
      <CreatePinIcon onClick={onClick} />
    </Wrapper>
  );
};

export default memo(NewPinIcon);

const Wrapper = styled.div`
  margin-bottom: 20px;
  svg {
    width: 30px;
    height: 30px;
    fill: var(--color-pink);
  }
`;
