import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ResponsiveContainer from "../../styling/ResponsiveContainer";
import { getPinsPendingReview } from "../Map/helpers";
import { SIZES } from "../../styling/constants";
import { centeredFlexColumn, fillSpace } from "../../styling/sharedstyles";
import PendingFilterItems from "./PendingFilterItems";
import { MappingContext } from "../Map/MappingContext";

const AdminPanel = () => {
  const { moderationResult } = useContext(MappingContext);
  const [pendingPins, setPendingPins] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { pendingReview } = await getPinsPendingReview();
        setPendingPins(pendingReview);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [moderationResult]);

  if (!pendingPins) return null;

  return (
    <ResponsiveContainer>
      <InnerContainer>
        <InnerContainerLiner>
          <h3>Pending Pins - Admin Only</h3>
          <>
            {pendingPins?.length === 0 ? (
              <Filler>No pins in queue :) 🤘</Filler>
            ) : (
              <>
                {pendingPins.map((pin) => {
                  return (
                    <PendingFilterItems
                      key={pin._id}
                      item={pin}
                      setPendingPins={setPendingPins}
                    />
                  );
                })}
              </>
            )}
          </>
        </InnerContainerLiner>
      </InnerContainer>
    </ResponsiveContainer>
  );
};

export default AdminPanel;

const InnerContainer = styled.div`
  ${fillSpace}
  padding: 5px;
  * {
    transition: all 0.2s ease;
  }
  h3 {
    font-family: "Fira Mono", monospace;
    text-transform: uppercase;
  }
`;
const InnerContainerLiner = styled.div`
  flex-direction: column;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.superDarkGrey};
  background-color: ${(props) => props.theme.colors.darkestGrey};
  border-radius: ${SIZES.borderRadius}px;
  ${fillSpace}
  padding: 10px;
  gap: 20px;
  overflow-y: scroll;
`;

const Filler = styled.div`
  ${centeredFlexColumn}
  ${fillSpace}
`;
