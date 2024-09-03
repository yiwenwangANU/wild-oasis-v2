import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (data) => {
      toast.success("Login Successfully.");
      console.log(data);
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Incorrect username or password.");
    },
  });
  return { login, isPending };
}

export default useLogin;
