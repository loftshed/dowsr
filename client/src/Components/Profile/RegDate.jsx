import styled from "styled-components";
import dayjs from "dayjs";

const RegDate = ({ regDate }) => {
  return (
    <RegDateWrapper>
      <span>Member since {dayjs(regDate).format("MMMM YYYY")}</span>
    </RegDateWrapper>
  );
};
export default RegDate;

const RegDateWrapper = styled.div`
  span {
    font-size: 12px;
    padding: 5px;
    @media (min-width: 450px) {
      font-size: 18px;
    }
  }
`;
