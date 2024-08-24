import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import useGetBookings from "./useGetBookings";

function BookingTable() {
  const { bookings, isPending } = useGetBookings();
  if (isPending) return <Spinner />;
  return (
    <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
      <Table.TableHeader>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.TableHeader>
      <Table.TableRows
        data={bookings}
        render={(booking) => <BookingRow key={booking.id} booking={booking} />}
      />
    </Table>
  );
}
export default BookingTable;
