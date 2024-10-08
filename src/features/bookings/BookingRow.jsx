import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiDotsVertical, HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { IoArchiveSharp } from "react-icons/io5";
import { HiTrash } from "react-icons/hi2";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { checkout } = useCheckOut(bookingId);
  const { deleteBooking, isPending } = useDeleteBooking(bookingId);
  const navigate = useNavigate();
  const handleSeeDetails = () => {
    navigate(`/bookings/${bookingId}`);
  };
  const handleCheckIn = () => {
    navigate(`/checkin/${bookingId}`);
  };

  const handleCheckOut = () => {
    checkout();
  };

  const handleDeleteBooking = () => {
    deleteBooking();
  };
  return (
    <Table.TableRow>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Menus>
        <Menus.Open name={bookingId}>
          <HiDotsVertical />
        </Menus.Open>
        <Menus.List name={bookingId}>
          <Menus.Item onClick={handleSeeDetails}>
            <HiEye /> See Details
          </Menus.Item>
          {status === "unconfirmed" ? (
            <Menus.Item onClick={handleCheckIn}>
              <IoArchiveSharp /> Check In
            </Menus.Item>
          ) : status === "checked-in" ? (
            <Menus.Item onClick={handleCheckOut}>
              <IoArchiveSharp /> Check Out
            </Menus.Item>
          ) : null}
          <Modal>
            <Modal.Open name="deleteBooking">
              <Menus.Item>
                <HiTrash /> Delete Booking
              </Menus.Item>
            </Modal.Open>
            <Modal.Window name="deleteBooking">
              <ConfirmDelete
                resourceName={`Booking #${bookingId}`}
                onConfirm={handleDeleteBooking}
                disabled={isPending}
              />
            </Modal.Window>
          </Modal>
        </Menus.List>
      </Menus>
    </Table.TableRow>
  );
}

export default BookingRow;
