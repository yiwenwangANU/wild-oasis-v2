import { useQuery } from "@tanstack/react-query";
import { getBookings as getBookingsAPI } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
function useGetBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortby");
  const filter =
    filterValue && filterValue !== "all"
      ? { field: "status", value: filterValue, operation: "eq" }
      : null;
  const sort = sortValue
    ? { field: sortValue.split("-")[0], trend: sortValue.split("-")[1] }
    : null;

  const { data: bookings, isPending } = useQuery({
    queryKey: ["getBookings", filter, sort],
    queryFn: () => getBookingsAPI(filter, sort),
  });
  return { bookings, isPending };
}

export default useGetBookings;
