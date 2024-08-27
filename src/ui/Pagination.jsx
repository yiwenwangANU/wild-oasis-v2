import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { RESULTS_PER_PAGE } from "../utils/constant";
const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const pages = Math.ceil(count / RESULTS_PER_PAGE);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  if (pages <= 1) return null;
  const nextPage = () => {
    if (currentPage < pages) {
      searchParams.set("page", currentPage + 1);
      setSearchParams(searchParams);
    }
  };
  const previousPage = () => {
    if (currentPage > 1) {
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams);
    }
  };
  return (
    <StyledPagination>
      <P>
        Showing <span>{1 + RESULTS_PER_PAGE * (currentPage - 1)}</span> to{" "}
        <span>
          {RESULTS_PER_PAGE * currentPage <= count
            ? RESULTS_PER_PAGE * currentPage
            : count}
        </span>{" "}
        of <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton
          onClick={() => previousPage()}
          disabled={currentPage <= 1}
        >
          <HiChevronLeft />
          Previous
        </PaginationButton>
        <PaginationButton
          onClick={() => nextPage()}
          disabled={currentPage >= pages}
        >
          Next
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
