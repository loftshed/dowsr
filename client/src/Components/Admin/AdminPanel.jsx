import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ResponsiveContainer from "../../styling/ResponsiveContainer";
import { getPinsPendingReview } from "../Home/Map/helpers";
import { SIZES } from "../../styling/constants";
import {
  centeredFlexColumn,
  centeredFlexRow,
  fillSpace,
} from "../../styling/sharedstyles";
import PendingFilterItems from "./PendingFilterItems";
import { MappingContext } from "../Home/Map/MappingContext";

// Minimum viable product: Display a list with all the pins in the database that are currently awaiting review, and a button to approve or reject them.

const AdminPanel = () => {
  const { moderationResult, setModerationResult } = useContext(MappingContext);
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
  border: 1px solid var(--color-super-dark-grey);
  background-color: var(--color-darkest-grey);
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
