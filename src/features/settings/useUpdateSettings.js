import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { mutate: updateSettings, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getSettings"] });
      toast.success("Settings updated successfully.");
    },
    onError: (err) => {
      console.log(err.message);
      toast.error("Failed to update settings.");
    },
  });
  return { updateSettings, isUpdating };
}

export default useUpdateSettings;
