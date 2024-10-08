import { createContext, useContext } from "react";
import styled from "styled-components";

const tableContext = createContext();

const StyledTable = styled.div`
  font-size: 1.4rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
  overflow: hidden;
`;
const StyledTableHeader = styled.header`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
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
const StyledTableRows = styled.div``;

const StyledTableRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
`;

const StyledTableFooter = styled.div`
  padding: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: var(--color-grey-50);
`;
function Table({ children, columns }) {
  return (
    <tableContext.Provider value={{ columns }}>
      <StyledTable>{children}</StyledTable>
    </tableContext.Provider>
  );
}

const TableHeader = ({ children }) => {
  const { columns } = useContext(tableContext);
  return <StyledTableHeader $columns={columns}>{children}</StyledTableHeader>;
};

const TableRows = ({ data, render }) => {
  return <StyledTableRows>{data.map(render)}</StyledTableRows>;
};

const TableRow = ({ children }) => {
  const { columns } = useContext(tableContext);
  return <StyledTableRow $columns={columns}>{children}</StyledTableRow>;
};

const TableFooter = ({ children }) => {
  return <StyledTableFooter>{children}</StyledTableFooter>;
};

Table.TableHeader = TableHeader;
Table.TableRows = TableRows;
Table.TableRow = TableRow;
Table.TableFooter = TableFooter;

export default Table;
