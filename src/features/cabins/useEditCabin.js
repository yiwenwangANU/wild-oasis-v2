import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin as editCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();
  const {
    mutate: editCabin,
    isPending: isEditting,
    isSuccess: editIsSuccess,
  } = useMutation({
    mutationFn: editCabinAPI,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getCabins"] });
      toast.success("Cabin updated successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editCabin, isEditting, editIsSuccess };
}

export default useEditCabin;
