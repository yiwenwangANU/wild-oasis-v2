import styled from "styled-components";
import Heading from "../ui/Heading";
import MainHeader from "../ui/MainHeader";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";
import BookingTable from "../features/bookings/BookingTable";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
`;
function Bookings() {
  return (
    <>
      <MainHeader>
        <Heading as="h1">All Bookings</Heading>
        <StyledContainer>
          <Filter
            filterField="status"
            options={[
              { label: "All", value: "all" },
              { label: "Checked out", value: "checked-out" },
              { label: "Checked in", value: "checked-in" },
              { label: "unconfirmed", value: "unconfirmed" },
            ]}
          />
          <SortBy
            filterField="sortby"
            options={[
              { label: "name(A-Z)", value: "name-asc" },
              { label: "name(Z-A)", value: "name-desc" },
              { label: "price(low first)", value: "price-asc" },
              { label: "price(high first)", value: "price-desc" },
              { label: "capacity(low first)", value: "capacity-asc" },
              { label: "capacity(high first)", value: "capacity-desc" },
            ]}
          />
        </StyledContainer>
      </MainHeader>
      <BookingTable />
    </>
  );
}

export default Bookings;
