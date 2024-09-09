import { useMutation } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignup() {
  // Mutations
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupAPI,
    onSuccess: () => {
      toast.success("Sign up successfully.");
    },
    onError: () => toast.error("Failed to sign up."),
  });
  return { signup, isPending };
}

export default useSignup;
