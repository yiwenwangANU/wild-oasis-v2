import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import MainHeader from "../ui/MainHeader";
function Cabins() {
  return (
    <>
      <MainHeader>
        <Heading as="h1">All cabins</Heading>
        <p>filter/sort</p>
      </MainHeader>
      <CabinTable />
      <div>
        <Button>Add New Cabin</Button>
      </div>
    </>
  );
}

export default Cabins;
