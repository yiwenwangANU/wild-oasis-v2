import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const { data, isPending, fetchStatus } = useQuery({
    queryKey: ["getUser"],
    queryFn: getCurrentUser,
  });
  return {
    user: data?.user_metadata,
    isPending,
    fetchStatus,
    isAuthenticated: data?.role === "authenticated",
  };
}

export default useUser;
