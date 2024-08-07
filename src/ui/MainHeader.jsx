import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: rows;
  justify-content: space-between;
  align-items: center;
`;

function MainHeader({ children }) {
  return <StyledHeader>{children}</StyledHeader>;
}

export default MainHeader;
