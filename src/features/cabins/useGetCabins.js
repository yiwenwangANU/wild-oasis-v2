import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useGetCabins() {
  const {
    data: cabins,
    isPending,
    // error,
  } = useQuery({
    queryKey: ["getCabins"],
    queryFn: getCabins,
  });

  return { cabins, isPending };
}

export default useGetCabins;
