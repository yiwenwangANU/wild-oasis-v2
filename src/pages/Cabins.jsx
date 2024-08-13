import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import MainHeader from "../ui/MainHeader";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
function Cabins() {
  const [showCabinForm, setShowCabinForm] = useState(false);

  function handleShowForm() {
    setShowCabinForm(true);
  }

  function handleCloseForm() {
    setShowCabinForm(false);
  }
  return (
    <>
      <MainHeader>
        <Heading as="h1">All cabins</Heading>
        <p>filter/sort</p>
      </MainHeader>
      <CabinTable />
      <div>
        <Button onClick={() => handleShowForm()}>Add New Cabin</Button>
      </div>
      {showCabinForm && <CreateCabinForm handleCloseForm={handleCloseForm} />}
    </>
  );
}

export default Cabins;
