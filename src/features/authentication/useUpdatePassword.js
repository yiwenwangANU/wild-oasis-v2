import { useMutation } from "@tanstack/react-query";
import { updateUserPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdatePassword() {
  const { mutate: updatePassword, isPending } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      toast.success("Update password successfully.");
    },
    onError: () => toast.error("Failed to update password."),
  });
  return { updatePassword, isPending };
}

export default useUpdatePassword;
