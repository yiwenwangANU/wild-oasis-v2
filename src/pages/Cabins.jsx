import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import MainHeader from "../ui/MainHeader";
import AddCabin from "../features/cabins/AddCabin";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
`;

function Cabins() {
  return (
    <>
      <MainHeader>
        <Heading as="h1">All Cabins</Heading>
        <StyledContainer>
          <Filter
            filterField="discount"
            options={[
              { label: "All", value: "all" },
              { label: "With discount", value: "with-discount" },
              { label: "No discount", value: "no-discount" },
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
      <CabinTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
