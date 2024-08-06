import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const Main = styled.main`
  display: grid;
  grid-template-rows: auto 1fr;
`;

const StyledMainLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  height: 100vh;
`;

const Container = styled.div`
  background-color: var(--color-grey-50);
`;
function AppLayout() {
  return (
    <StyledMainLayout>
      <Sidebar />
      <Main>
        <Header />
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledMainLayout>
  );
}

export default AppLayout;
