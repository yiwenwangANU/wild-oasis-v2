import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import useGetBooking from "../bookings/useGetBooking";
import { formatCurrency } from "../../utils/helpers";
import useCheckIn from "./useCheckIn";
import { useState } from "react";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { bookingId } = useParams();
  const { booking, isPending: isGettingBooking } = useGetBooking(bookingId);
  const { checkIn, isPending: isCheckingIn } = useCheckIn(bookingId);

  function handleConfirmPayment() {
    setConfirmPaid(!confirmPaid);
  }
  function handleCheckin() {
    checkIn();
  }
  if (isGettingBooking) return <Spinner />;
  const { guests, totalPrice, status, isPaid, hasBreakfast } = booking;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox onChange={handleConfirmPayment}>
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
