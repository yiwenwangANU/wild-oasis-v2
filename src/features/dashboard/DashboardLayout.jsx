import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <div>Place Holder 1</div>
      <div>Place Holder 2</div>
      <div>Place Holder 3</div>
      <div>Place Holder 4</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
