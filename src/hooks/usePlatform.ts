import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Results } from "../components/PlatformSelector";
const usePlatform = () => {
  const handlePlatform = () =>
    apiClient.get("/platforms/lists/parents").then((res) => res.data.results);
  const { data, error } = useQuery<Results[], Error>({
    queryKey: ["platform"],
    queryFn: handlePlatform,
  });
  return { data, error };
};

export default usePlatform;
