import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { Genres } from "./useGenres";
import { Results } from "../components/PlatformSelector";

interface InnerPlatform {
  id: number;
  name: string;
  slug: string;
}

interface Platform {
  platform: InnerPlatform;
}
interface ResultType {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: Platform[];
  metacritic: number;
}
interface FetchedGames {
  results: ResultType[];
}

const useGame = (
  selectedGenres: Genres | null,
  selectedPlatform: Results | null
) => {
  const handleGames = () =>
    apiClient
      .get<FetchedGames>("/games", {
        params: {
          genres: selectedGenres?.id,
          platforms: selectedPlatform?.id,
        },
      })
      .then((res) => res.data.results);
  const { data, error, isLoading } = useQuery<ResultType[], Error>({
    queryKey: ["games", selectedGenres?.id, selectedPlatform?.id, "posts"],
    queryFn: handleGames,
  });

  return { data, error, isLoading };
};

export default useGame;
