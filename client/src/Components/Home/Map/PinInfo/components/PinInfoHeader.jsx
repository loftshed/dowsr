import { RiLinkM as LinkIcon } from "react-icons/ri";
import styled from "styled-components";
import {
  centeredFlexRow,
  fakeStroke,
} from "../../../../../styling/sharedstyles";
import { AppContext } from "../../../../../AppContext";
import { useContext } from "react";

const PinInfoHeader = ({ popupInfo }) => {
  const { loggedInUser } = useContext(AppContext);
  if (popupInfo.site)
    return (
      <PinInfoHeaderWrapper>
        <a href={`${popupInfo.site}`} target="_new">
          {popupInfo.desc}
          <LinkIcon style={{ pointerEvents: "none" }} />
        </a>
      </PinInfoHeaderWrapper>
    );

  if (!popupInfo.site)
    return <PinInfoHeaderWrapper>{popupInfo.desc}</PinInfoHeaderWrapper>;
};
export default PinInfoHeader;

const PinInfoHeaderWrapper = styled.div`
  ${centeredFlexRow}
  font-size: 15px;
  font-weight: 800;
  color: var(--color-light-grey);
  padding: 3px;
  text-align: center;
  ${fakeStroke}
  a {
    display: flex;
    align-items: center;
    gap: 4px;
    &:hover {
      color: var(--color-teal);
    }
  }
`;
