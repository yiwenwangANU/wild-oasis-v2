import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

function useGetSettings() {
  const { data, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: getSettings,
  });
  return { data, isPending };
}

export default useGetSettings;
