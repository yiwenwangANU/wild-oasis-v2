import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";

function useDeleteBooking(id) {
  const queryClient = useQueryClient();

  // Mutations
  const { mutate: deleteBooking, isPending } = useMutation({
    mutationFn: () => deleteBookingAPI(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getBookings"] });
      toast.success("Booking deleted successfully.");
    },
    onError: () => toast.error("Failed to delete booking."),
  });
  return { deleteBooking, isPending };
}

export default useDeleteBooking;
