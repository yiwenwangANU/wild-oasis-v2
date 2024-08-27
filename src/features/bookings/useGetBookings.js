import { useQuery } from "@tanstack/react-query";
import { getBookings as getBookingsAPI } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { RESULTS_PER_PAGE } from "../../utils/constant";
function useGetBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortby");
  const pageValue = searchParams.get("page");
  const filter =
    filterValue && filterValue !== "all"
      ? { field: "status", value: filterValue, operation: "eq" }
      : null;
  const sort = sortValue
    ? { field: sortValue.split("-")[0], trend: sortValue.split("-")[1] }
    : null;
  const page = pageValue
    ? {
        from: 1 + (pageValue - 1) * RESULTS_PER_PAGE,
        to: 1 + pageValue * RESULTS_PER_PAGE,
      }
    : { from: 1, to: RESULTS_PER_PAGE };
  const { data: bookings, isPending } = useQuery({
    queryKey: ["getBookings", filter, sort, page],
    queryFn: () => getBookingsAPI(filter, sort, page),
  });
  return { bookings, isPending };
}

export default useGetBookings;
