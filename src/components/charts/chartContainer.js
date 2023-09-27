import styled from "styled-components";

const ChartContainer = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default ChartContainer;

const StyledContainer = styled.div`
  background-color: #fff;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 1px 1px solid red;
`;
