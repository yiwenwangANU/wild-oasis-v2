import { useQuery } from "@tanstack/react-query";
import { getBookings as getBookingsAPI } from "../../services/apiBookings";
function useGetBookings() {
  const { data: bookings, isPending } = useQuery({
    queryKey: ["getBookings"],
    queryFn: getBookingsAPI,
  });
  return { bookings, isPending };
}

export default useGetBookings;
