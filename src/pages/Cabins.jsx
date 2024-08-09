import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import MainHeader from "../ui/MainHeader";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
function Cabins() {
  const [showCabinForm, setShowCabinForm] = useState(false);
  return (
    <>
      <MainHeader>
        <Heading as="h1">All cabins</Heading>
        <p>filter/sort</p>
      </MainHeader>
      <CabinTable />
      <div>
        <Button onClick={() => setShowCabinForm(!showCabinForm)}>
          Add New Cabin
        </Button>
      </div>
      {showCabinForm && <CreateCabinForm />}
    </>
  );
}

export default Cabins;
