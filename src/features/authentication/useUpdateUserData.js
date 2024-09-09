import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserData } from "../../services/apiAuth";
import toast from "react-hot-toast";
function useUpdateUserData() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      toast.success("User data updated successfully.");
    },
    onError: () => toast.error("Failed to update user data."),
  });
  return { updateUser, isPending };
}

export default useUpdateUserData;
