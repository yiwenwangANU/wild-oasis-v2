import Spinner from "../../ui/Spinner";
import useGetCabins from "./useGetCabins";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, isPending } = useGetCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  const sortValue = searchParams.get("sortby") || "name-asc";
  if (isPending) return <Spinner />;
  let filteredCabins =
    filterValue === "with-discount"
      ? cabins.filter((cabin) => cabin.discount !== 0)
      : filterValue === "no-discount"
      ? cabins.filter((cabin) => cabin.discount === 0)
      : cabins;

  let sortedCabins =
    sortValue === "name-asc"
      ? filteredCabins.sort((a, b) => a.name.localeCompare(b.name))
      : sortValue === "name-desc"
      ? filteredCabins.sort((a, b) => b.name.localeCompare(a.name))
      : sortValue === "price-asc"
      ? filteredCabins.sort((a, b) => a.regularPrice - b.regularPrice)
      : sortValue === "price-desc"
      ? filteredCabins.sort((a, b) => b.regularPrice - a.regularPrice)
      : sortValue === "capacity-asc"
      ? filteredCabins.sort((a, b) => a.maxCapacity - b.maxCapacity)
      : sortValue === "capacity-desc"
      ? filteredCabins.sort((a, b) => b.maxCapacity - a.maxCapacity)
      : filteredCabins;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.TableHeader>
        <div></div>
        <div>CABIN</div>
        <div>CAPACITY</div>
        <div>PRICE</div>
        <div>DISCOUNT</div>
        <div></div>
      </Table.TableHeader>
      <Table.TableRows
        data={sortedCabins}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
}

export default CabinTable;
