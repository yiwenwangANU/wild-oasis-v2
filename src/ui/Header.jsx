import styled from "styled-components";
import Logout from "../features/authentication/Logout";

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
`;

function Header() {
  return (
    <StyledHeader>
      <Logout />
    </StyledHeader>
  );
}

export default Header;
