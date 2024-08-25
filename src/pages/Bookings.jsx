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
            defaultOption="all"
          />
          <SortBy
            filterField="sortby"
            options={[
              { label: "date(recent first)", value: "startDate-asc" },
              { label: "date(earlier first)", value: "startDate-desc" },
              { label: "amount(low first)", value: "totalPrice-asc" },
              { label: "amount(high first)", value: "totalPrice-desc" },
            ]}
          />
        </StyledContainer>
      </MainHeader>
      <BookingTable />
    </>
  );
}

export default Bookings;
