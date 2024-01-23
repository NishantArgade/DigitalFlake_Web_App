import axios from "axios";
import { useQuery } from "react-query";

export const useAuth = () => {
  const { isError } = useQuery({
    queryKey: ["tokenValidation"],
    queryFn: async () => {
      return axios.get("/api/validate-token");
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  let isLoggedIn = !isError;

  return { isLoggedIn };
};
