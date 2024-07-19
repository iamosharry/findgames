import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";

export interface Genres {
  id: number;
  name: string;
  image_background: string;
}
interface FetchedGenres {
  results: Genres[];
}

const useGenres = () => {
  const handleGenres = () =>
    apiClient.get<FetchedGenres>("/genres").then((res) => res.data.results);
  const { data, error, isLoading } = useQuery<Genres[], Error>({
    queryKey: ["genres"],
    queryFn: handleGenres,
  });
  return { data, error, isLoading };
};

export default useGenres;
