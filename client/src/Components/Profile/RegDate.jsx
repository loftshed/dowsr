import styled from "styled-components";
import dayjs from "dayjs";

const RegDate = ({ regDate }) => {
  return (
    <RegDateWrapper>
      <span style={{ fontSize: "12px", padding: "5px" }}>
        Member since {dayjs(regDate).format("MMMM YYYY")}
      </span>
    </RegDateWrapper>
  );
};
export default RegDate;

const RegDateWrapper = styled.div``;
