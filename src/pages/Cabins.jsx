import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import MainHeader from "../ui/MainHeader";
import AddCabin from "../features/cabins/AddCabin";
function Cabins() {
  return (
    <>
      <MainHeader>
        <Heading as="h1">All cabins</Heading>
        <p>filter/sort</p>
      </MainHeader>
      <CabinTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
