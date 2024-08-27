import { useQuery } from "@tanstack/react-query";
import { getBookings as getBookingsAPI } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { RESULTS_PER_PAGE } from "../../utils/constant";
function useGetBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortby");
  const pageValue = parseInt(searchParams.get("page"));
  const filter =
    filterValue && filterValue !== "all"
      ? { field: "status", value: filterValue, operation: "eq" }
      : null;
  const sort = sortValue
    ? { field: sortValue.split("-")[0], trend: sortValue.split("-")[1] }
    : null;
  const page = pageValue
    ? {
        from: (pageValue - 1) * RESULTS_PER_PAGE,
        to: pageValue * RESULTS_PER_PAGE - 1,
      }
    : { from: 0, to: RESULTS_PER_PAGE - 1 };
  const { data, isPending } = useQuery({
    queryKey: ["getBookings", filter, sort, page],
    queryFn: () => getBookingsAPI(filter, sort, page),
  });
  const bookings = data?.data;
  const count = data?.count;

  return { bookings, count, isPending };
}

export default useGetBookings;
