import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckOut(id) {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending } = useMutation({
    mutationFn: () => updateBooking(id, { status: "checked-out" }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["getBooking", "getBookings"],
      });
      toast.success("Checkout successfully.");
    },
    onError: () => toast.error("Failed to checkout."),
  });

  return { checkout, isPending };
}

export default useCheckOut;
