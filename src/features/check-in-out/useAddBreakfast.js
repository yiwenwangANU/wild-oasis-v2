import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

function useAddBreakfast(id) {
  const queryClient = useQueryClient();

  const { mutate: addBreakfast, isPending } = useMutation({
    mutationFn: () => updateBooking(id, { hasBreakfast: true }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getBooking"] });
    },
    onError: () => toast.error("Failed to add breakfast."),
  });
  return { addBreakfast, isPending };
}

export default useAddBreakfast;
