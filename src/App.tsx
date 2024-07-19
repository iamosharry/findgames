import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { Genres } from "./hooks/useGenres";
import PlatformSelector, { Results } from "./components/PlatformSelector";
import Sorting from "./components/Sorting";
import BeamInput from "./components/BeamInput";

export interface GameQuery {
  genre: Genres | null;
  platform: Results | null;
  searchText: string;
}

const App = () => {
  const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);
  const [selected, setSelected] = useState(() => {
    const saved = localStorage.getItem("selected");
    return saved !== null ? JSON.parse(saved) : false;
  });

  // Save the state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);
  const handleSelect = () => {
    setSelected(true);
  };

  const removeSelect = () => {
    setSelected(false);
  };

  return (
    <>
      <div className={` ${selected && "bg-black text-white "}`}>
        <Navbar
          selected={selected}
          handleSelect={handleSelect}
          removeSelect={removeSelect}
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        />
      </div>
      <div className="lg:hidden h-full items-center justify-center  px-4 w-full bg-black">
        <BeamInput
          onSearch={(searchText) => setGameQuery({ ...gameQuery, searchText })}
        />
      </div>
      <div className={`md:flex py-10  ${selected && "bg-black text-white"}`}>
        <div className="hidden  md:block md:w-[20%] cursor-pointer  ">
          <GenreList
            setSelectedGenres={(genre) => setGameQuery({ ...gameQuery, genre })}
            selectedGenres={gameQuery.genre}
          />
        </div>
        <div className=" w-full md:w-[85%]">
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
    </>
  );
};

export default App;
