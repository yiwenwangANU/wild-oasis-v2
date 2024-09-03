import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useUser() {
  const {
    data: user,
    isPending,
    fetchStatus,
  } = useQuery({
    queryKey: ["getUser"],
    queryFn: getCurrentUser,
  });
  return {
    user,
    isPending,
    fetchStatus,
    isAuthenticated: user?.role === "authenticated",
  };
}

export default useUser;
