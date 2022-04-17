import { useEffect, useState } from "react";
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

// Minimum viable product: Display a list with all the pins in the database that are currently awaiting review, and a button to approve or reject them.

const AdminPanel = () => {
  const [pendingPins, setPendingPins] = useState([]);

  useEffect(() => {
    (async () => {
      const { pendingReview } = await getPinsPendingReview();
      setPendingPins(pendingReview);
    })();
  }, []);

  if (!pendingPins.length === 0) return null;

  return (
    <ResponsiveContainer>
      <InnerContainer>
        <InnerContainerLiner>
          <h3>Pending Pins</h3>
          {pendingPins.map((pin) => {
            return <PendingFilterItems key={pin._id} item={pin} />;
          })}
        </InnerContainerLiner>
      </InnerContainer>
    </ResponsiveContainer>
  );
};

export default AdminPanel;

const InnerContainer = styled.div`
  ${fillSpace}
  padding: 5px;
`;
const InnerContainerLiner = styled.div`
  flex-direction: column;
  align-items: center;
  border: 1px solid var(--color-super-dark-grey);
  background-color: var(--color-darkest-grey);
  border-radius: ${SIZES.borderRadius}px;
  ${fillSpace}
  padding: 10px;
  gap: 10px;
  overflow-y: scroll;
`;
