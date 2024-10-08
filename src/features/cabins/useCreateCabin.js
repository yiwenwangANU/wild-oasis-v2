import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient();
  const {
    mutate: createCabin,
    isPending: isCreating,
    isSuccess: createIsSuccess,
  } = useMutation({
    mutationFn: createCabinAPI,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getCabins"] });
      toast.success("Cabin created successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isCreating, createIsSuccess };
}

export default useCreateCabin;
