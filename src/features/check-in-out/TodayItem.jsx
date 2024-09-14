import Tag from "../../ui/Tag";
import Flag from "../../ui/Flag";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ item }) {
  const { id, status, guests, numNights } = item;
  const navigate = useNavigate();
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} /> <Guest>{guests.fullName}</Guest>
      <span>{numNights} nights</span>
      {status === "unconfirmed" ? (
        <Button
          variation="primary"
          size="small"
          onClick={() => navigate(`/checkin/${id}`)}
        >
          check in
        </Button>
      ) : (
        <CheckoutButton bookingId={id}>check out</CheckoutButton>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
