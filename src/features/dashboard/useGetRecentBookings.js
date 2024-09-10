import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

function useGetRecentBookings() {
  const [searchParams] = useSearchParams();
  const days = Number(searchParams.get("last")) || 7;
  const date = subDays(new Date(), days).toISOString();
  // Queries
  const { data, isPending } = useQuery({
    queryKey: ["getRecentBookings", days],
    queryFn: () => getBookingsAfterDate(date),
  });

  return { data, isPending };
}

export default useGetRecentBookings;
