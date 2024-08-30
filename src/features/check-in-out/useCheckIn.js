import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckIn(id) {
  const queryClient = useQueryClient();
  const { mutate: checkIn, isPending } = useMutation({
    mutationFn: () => updateBooking(id, { status: "checked-in", isPaid: true }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getBooking"] });
      toast.success("Checked in successfully.");
    },
    onError: () => {
      toast.error("Failed to check in.");
    },
  });
  return { checkIn, isPending };
}

export default useCheckIn;
