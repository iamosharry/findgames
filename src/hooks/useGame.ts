import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/api-client";
import { GameQuery } from "../App";

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

const useGame = (gameQuery: GameQuery) => {
  const handleGames = () =>
    apiClient
      .get<FetchedGames>("/games", {
        params: {
          genres: gameQuery.genre?.id,
          platforms: gameQuery.platform?.id,
          search: gameQuery.searchText,
        },
      })
      .then((res) => res.data.results);
  const { data, error, isLoading } = useQuery<ResultType[], Error>({
    queryKey: [
      "games",
      gameQuery.genre?.id,
      gameQuery.platform?.id,
      gameQuery.searchText,
      "posts",
    ],
    queryFn: handleGames,
  });

  return { data, error, isLoading };
};

export default useGame;
