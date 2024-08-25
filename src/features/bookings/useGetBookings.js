import { useQuery } from "@tanstack/react-query";
import { getBookings as getBookingsAPI } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
function useGetBookings() {
  const [searchParams] = useSearchParams();
  let filter,
    sort = {};

  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortby");
  if (filterValue && filterValue !== "all") {
    filter = { field: "status", value: filterValue };
  }
  if (sortValue)
    sort = { field: sortValue.split("-")[0], trend: sortValue.split("-")[1] };
  const { data: bookings, isPending } = useQuery({
    queryKey: ["getBookings", filter, sort],
    queryFn: () => getBookingsAPI(filter, sort),
  });
  return { bookings, isPending };
}

export default useGetBookings;
