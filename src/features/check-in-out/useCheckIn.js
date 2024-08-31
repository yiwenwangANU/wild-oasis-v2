import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckIn(id) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkIn, isPending } = useMutation({
    mutationFn: () =>
      updateBooking(id, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getBooking"] });
      navigate("/");
      toast.success("Checked in successfully.");
    },
    onError: () => {
      toast.error("Failed to check in.");
    },
  });
  return { checkIn, isPending };
}

export default useCheckIn;
