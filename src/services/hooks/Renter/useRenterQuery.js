import { useQuery } from "@tanstack/react-query";
import { renterApiService } from "../../renterApiService";

export const useGetRentersQuery = (params, options) => {
  return useQuery({
    queryKey: ["getRenters"],
    queryFn: () => {
      return renterApiService.getRenters(params);
    },
    ...options,
  });
};
