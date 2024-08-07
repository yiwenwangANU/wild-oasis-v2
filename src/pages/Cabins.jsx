import { useMutation, useQuery } from "@tanstack/react-query";

import CabinTable from "../features/cabins/CabinTable";
import CabinRow from "../features/cabins/CabinRow";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Spinner from "../ui/Spinner";
import { getCabins } from "../services/apiCabins";
import CabinRows from "../features/cabins/CabinRows";
import Header from "../ui/Header";
import Button from "../ui/Button";
import MainHeader from "../ui/MainHeader";
function Cabins() {
  const {
    data: cabins,
    isPending,
    // error,
  } = useQuery({
    queryKey: ["getCabins"],
    queryFn: getCabins,
  });
  if (isPending) return <Spinner />;
  console.log(cabins);

  return (
    <>
      <MainHeader>
        <Heading as="h1">All cabins</Heading>
        <p>filter/sort</p>
      </MainHeader>
      <CabinTable>
        <CabinRows>
          {cabins.map((cabin) => (
            <Row key={cabin.id}>
              <CabinRow key={cabin.id} cabin={cabin} />
            </Row>
          ))}
        </CabinRows>
      </CabinTable>
      <div>
        <Button>Add New Cabin</Button>
      </div>
    </>
  );
}

export default Cabins;
