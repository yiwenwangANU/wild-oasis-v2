import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const { data: todayActivity, isPending } = useQuery({
    queryKey: ["todayActivity"],
    queryFn: getStaysTodayActivity,
  });
  return { todayActivity, isPending };
}

export default useTodayActivity;
