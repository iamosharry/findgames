import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import { Genres } from "./hooks/useGenres";
import PlatformSelector, { Results } from "./components/PlatformSelector";
const App = () => {
  const [selectedGenres, setSelectedGenres] = useState<Genres | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<Results | null>(
    null
  );

  console.log(selectedPlatform);

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
        />
      </div>
      <div className={`md:flex py-10  ${selected && "bg-black text-white"}`}>
        <div className="hidden  md:block md:w-[20%] cursor-pointer  ">
          <GenreList
            setSelectedGenres={(item) => setSelectedGenres(item)}
            selectedGenres={selectedGenres}
          />
        </div>
        <div className=" w-full md:w-[85%]">
          <PlatformSelector
            setSelectedPlatform={setSelectedPlatform}
            selectedPlatform={selectedPlatform}
          />
          <GameGrid
            selected={selected}
            selectedGenres={selectedGenres}
            selectedPlatform={selectedPlatform}
          />
        </div>
      </div>
    </>
  );
};

export default App;
