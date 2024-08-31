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
import useGetSettings from "../settings/useGetSettings";
import useAddBreakfast from "./useAddBreakfast";
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
  const [confirmAddBreakfast, setConfirmAddBreakfast] = useState(false);
  const { bookingId } = useParams();
  const { booking, isPending: isGettingBooking } = useGetBooking(bookingId);
  const { checkIn, isPending: isCheckingIn } = useCheckIn(bookingId);
  const { addBreakfast, isPending: isAddingBreakfast } =
    useAddBreakfast(bookingId);
  const { settings, isPending: isGettingSetting } = useGetSettings();
  function handleConfirmPayment() {
    setConfirmPaid(!confirmPaid);
  }
  function handleAddBreakfast() {
    setConfirmAddBreakfast(!addBreakfast);
  }
  function handleCheckin() {
    checkIn();
  }
  if (isGettingBooking || isGettingSetting) return <Spinner />;
  const { guests, cabinPrice, isPaid, hasBreakfast, numNights, numGuests } =
    booking;
  const totalBreakfastPrice = numNights * numGuests * settings.breakfastPrice;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox onChange={handleAddBreakfast}>
            Want to add breakfast for {formatCurrency(totalBreakfastPrice)} ?
          </Checkbox>
        </Box>
      )}

      {!isPaid ? (
        <Box>
          <Checkbox onChange={handleConfirmPayment}>
            I confirm that {guests.fullName} has paid the total amount of{" "}
            {hasBreakfast || confirmAddBreakfast
              ? `${formatCurrency(
                  cabinPrice + totalBreakfastPrice
                )}(${formatCurrency(cabinPrice)} + ${formatCurrency(
                  totalBreakfastPrice
                )})`
              : formatCurrency(cabinPrice)}
          </Checkbox>
        </Box>
      ) : null}
      <ButtonGroup>
        <Button
          onClick={() => {
            confirmAddBreakfast ? addBreakfast() : null;
            handleCheckin();
          }}
          disabled={
            !(confirmPaid || isPaid) || isCheckingIn || isAddingBreakfast
          }
        >
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
