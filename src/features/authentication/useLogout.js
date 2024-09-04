import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      toast.success("Logout successfully.");
    },
    onError: () => toast.error("Failed to logout."),
  });
  return { logout, isPending };
}

export default useLogout;
