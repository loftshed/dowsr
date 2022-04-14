import styled from "styled-components";
import { Popup, useMap } from "react-map-gl";
import {
  fillSpace,
  centeredFlexColumn,
} from "../../../Styling/StyledComponents";
import { useContext } from "react";
import { MappingContext } from "../../../Context/MappingContext";

const InfoPopup = ({ popupInfo }) => {
  const { setPopupInfo } = useContext(MappingContext);
  console.log(popupInfo);

  return (
    <Popup
      anchor="top"
      longitude={popupInfo.longitude}
      latitude={popupInfo.latitude}
      // closeOnClick={true}
      maxWidth={"350px"}
      onClose={() => setPopupInfo(null)}
    >
      <PopupContainer>
        <Heading>
          <h3>{popupInfo.name}</h3>
        </Heading>
        <Body>
          <a target="_new" href={popupInfo.site}>
            Website
          </a>
        </Body>
      </PopupContainer>
    </Popup>
  );
};
export default InfoPopup;

const PopupContainer = styled.div`
  user-select: none;
  ${centeredFlexColumn}
  a {
    color: var(--color-super-dark-grey);
  }
`;

const Heading = styled.div`
  h3 {
    color: var(--color-super-dark-grey);
    font-size: 18px;
  }
`;

const Body = styled.div`
  ${fillSpace}
  ${centeredFlexColumn}
`;
