import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useGetSettings() {
  const { data: settings, isPending } = useQuery({
    queryKey: ["getSettings"],
    queryFn: getSettings,
  });
  return { settings, isPending };
}

export default useGetSettings;
