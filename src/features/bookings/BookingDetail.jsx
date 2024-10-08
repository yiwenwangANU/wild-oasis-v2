import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import useGetBooking from "./useGetBooking";
import Spinner from "../../ui/Spinner";
import useCheckOut from "../check-in-out/useCheckOut";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import useDeleteBooking from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { bookingId } = useParams();
  const { booking, isPending } = useGetBooking(bookingId);
  const { checkout, isPending: isCheckingOut } = useCheckOut(bookingId);
  const { deleteBooking, isPending: isDeleting } = useDeleteBooking(bookingId);
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const handleCheckIn = () => {
    navigate(`/checkin/${bookingId}`);
  };

  const handleCheckOut = () => {
    checkout();
    navigate("/bookings");
  };

  const handleDeleteBooking = () =>
    deleteBooking(null, {
      onSettled: () => {
        navigate(-1);
      },
    });
  if (isPending) return <Spinner />;
  const { status } = booking;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack} disabled={isCheckingOut}>
          &larr; Back
        </ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open name="deleteBooking">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              resourceName={`Booking #${bookingId}`}
              onConfirm={handleDeleteBooking}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        {status === "unconfirmed" ? (
          <Button onClick={handleCheckIn} disabled={isDeleting}>
            Check in
          </Button>
        ) : status === "checked-in" ? (
          <Button onClick={handleCheckOut} disabled={isDeleting}>
            Check out
          </Button>
        ) : null}
        <Button variation="secondary" onClick={moveBack} disabled={isDeleting}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
