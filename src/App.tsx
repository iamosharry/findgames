import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { Genres } from "./hooks/useGenres";
import PlatformSelector, { Results } from "./components/PlatformSelector";
import Sorting from "./components/Sorting";
import BeamInput from "./components/BeamInput";
import selectContext from "./state-management/contexts/selectedContext";

export interface GameQuery {
  genre: Genres | null;
  platform: Results | null;
  searchText: string;
}

const App = () => {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const [selected, setSelected] = useState(() => {
    // Retrieve initial value from local storage or default to false
    const storedSelected = localStorage.getItem("selected");
    return storedSelected ? JSON.parse(storedSelected) : false;
  });

  useEffect(() => {
    // Save selected state to local storage whenever it changes
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  console.log(selected);

  return (
    <selectContext.Provider value={{ selected, setSelected }}>
      <div className={` ${selected && "bg-black text-white "}`}>
        <Navbar
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        />
      </div>
      <div
        className={`lg:hidden h-full items-center justify-center  px-4 w-full ${
          selected === true ? "bg-black" : "bg-white"
        } `}
      >
        <BeamInput
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        />
      </div>
      <div className={`md:flex py-10 ${selected && "bg-black text-white"}`}>
        <div className="hidden md:block md:w-[20%] cursor-pointer">
          <GenreList
            setSelectedGenres={(genre) => setGameQuery({ ...gameQuery, genre })}
            selectedGenres={gameQuery.genre}
          />
        </div>
        <div className="w-full md:w-[85%]">
          <div className="flex">
            <PlatformSelector
              setSelectedPlatform={(platform) =>
                setGameQuery({ ...gameQuery, platform })
              }
              selectedPlatform={gameQuery.platform}
            />
            <Sorting />
          </div>
          <GameGrid selected={selected} gameQuery={gameQuery} />
        </div>
      </div>
    </selectContext.Provider>
  );
};

export default App;
