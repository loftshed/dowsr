import styled from "styled-components";
import { SIZES } from "../../styling/constants";
import { fillSpace, IconNavLink } from "../../styling/sharedstyles";
import { NotificationIcon, AdminIcon } from "../../styling/react-icons";
import LogoutButton from "../Auth/LogoutButton";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { MappingContext } from "../Home/Map/MappingContext";

const MenuPopout = ({ show }) => {
  const { setShowBurgerMenu, loggedInUser } = useContext(AppContext);
  const { creatingNewPin, setCreatingNewPin, setMapModalMessage } =
    useContext(MappingContext);

  // STRETCH: Add pending pins to this popuout.

  return (
    <BurgerWrapper show={show}>
      <Content>
        {
          // Probably not very secure, but...
          // If the current user has the isAdmin flag on their account, display link to backoffice.
          loggedInUser?.isAdmin && (
            <AdminContainer>
              <IconNavLink
                to="/admin"
                onClick={() => {
                  setShowBurgerMenu(false);
                  if (creatingNewPin) {
                    setCreatingNewPin(false);
                    setMapModalMessage("");
                  }
                }}
              >
                <AdminIcon />
              </IconNavLink>
            </AdminContainer>
          )
        }
        <InnerContainer>
          <LogoutButton
            onClick={() => {
              setShowBurgerMenu(false);
            }}
          />
        </InnerContainer>
        <InnerContainer>
          <IconNavLink
            to="/notifications"
            onClick={() => {
              setShowBurgerMenu(false);
              if (creatingNewPin) {
                setCreatingNewPin(false);
                setMapModalMessage("");
              }
            }}
          >
            <NotificationIcon />
          </IconNavLink>
        </InnerContainer>
      </Content>
    </BurgerWrapper>
  );
};

export default MenuPopout;

const BurgerWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: fit-content;
  bottom: ${(props) => (props.show ? "35px" : "-500px")};
  right: 1px;
  background-color: var(--color-darkest-grey);
  border-radius: ${SIZES.borderRadius}px;
  outline: 1px solid var(--color-super-dark-grey);
  transition: 0.2s all ease;
  opacity: ${(props) => (props.show ? "100%" : "0%")};
  z-index: -1;
  svg {
    width: 25px;
    height: 25px;
  }
`;

const Content = styled.div`
  flex-direction: column;
  gap: 10px;
  ${fillSpace};
  padding: 5px;
  padding-bottom: 30px;
`;

const InnerContainer = styled.div`
  ${fillSpace};
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 100px;
  background-color: var(--color-darkest-blue);
  outline: 1px solid var(--color-super-dark-grey);
  padding: 5px;
  gap: 10px;
  box-shadow: inset 0px 0px 30px rgba(68, 187, 164, 0.2);
  ${IconNavLink},
  button {
    outline: 1px solid var(--color-pink);
  }
  overflow: hidden;
`;

const AdminContainer = styled(InnerContainer)``;
