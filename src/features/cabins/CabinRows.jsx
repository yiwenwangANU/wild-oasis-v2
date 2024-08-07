import styled from "styled-components";

const StyledCabinRows = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
`;

function CabinRows({ children }) {
  return <StyledCabinRows>{children}</StyledCabinRows>;
}

export default CabinRows;
