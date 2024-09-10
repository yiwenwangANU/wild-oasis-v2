import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

function useGetRecentStays() {
  const [searchParams] = useSearchParams();
  const days = Number(searchParams.get("last")) || 7;
  const date = subDays(new Date(), days).toISOString();
  // Queries
  const { data, isPending } = useQuery({
    queryKey: ["getRecentStays", days],
    queryFn: () => getStaysAfterDate(date),
  });
  const recentStays = data?.filter(
    (ele) => ele.status === "checked-in" || ele.status === "checked-out"
  );
  return { recentStays, days, isPending };
}

export default useGetRecentStays;
