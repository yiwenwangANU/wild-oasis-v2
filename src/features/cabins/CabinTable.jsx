import styled from "styled-components";
import CabinRows from "./CabinRows";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useGetCabins from "./useGetCabins";

const Table = styled.div`
  font-size: 1.4rem;
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  const { cabins, isPending } = useGetCabins();
  if (isPending) return <Spinner />;
  return (
    <Table>
      <TableHeader>
        <div></div>
        <div>CABIN</div>
        <div>CAPACITY</div>
        <div>PRICE</div>
        <div>DISCOUNT</div>
        <div></div>
      </TableHeader>
      <CabinRows>
        {cabins.map((cabin) => (
          <Row key={cabin.id}>
            <CabinRow key={cabin.id} cabin={cabin} />
          </Row>
        ))}
      </CabinRows>
    </Table>
  );
}

export default CabinTable;
