import { RiLinkM as LinkIcon } from "react-icons/ri";
import styled from "styled-components";
import { centeredFlexRow } from "../../../../../styling/sharedstyles";

const PinInfoHeader = ({ popupInfo }) => {
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
  a {
    display: flex;
    align-items: center;
    gap: 4px;
    &:hover {
      color: var(--color-teal);
    }
  }
`;
