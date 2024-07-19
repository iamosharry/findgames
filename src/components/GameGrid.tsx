import useGame from "../hooks/useGame";
import {
  FaWindows,
  FaPlaystation,
  FaAndroid,
  FaApple,
  FaLinux,
  FaXbox,
} from "react-icons/fa";

import { MdPhoneIphone } from "react-icons/md";
import { SiNintendo } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { IconType } from "react-icons";
import Critic from "./Critic";
import LoadingSkeleton from "./LoadingSkeleton";

import getCroppedImages from "../services/image-url";
import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
  selected?: boolean;
}
const GameGrid = ({ gameQuery, selected }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendo,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };
  const { data, error, isLoading } = useGame(gameQuery);

  // Determine the number of skeleton cards to display while loading
  const skeletonCards = new Array(12).fill(0);

  return (
    <>
      {error && <p>{error.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4 px-5">
        {isLoading
          ? skeletonCards.map((_, index) => <LoadingSkeleton key={index} />)
          : data?.map((game) => (
              <div
                key={game.id}
                className={`relative bg-gray-950 rounded-md overflow-hidden shadow-slate-900 mb-4 shadow-md
                    ${!selected && " text-white"}`}
              >
                <div className="h-[250px] bg-black mb-3">
                  <img
                    className="w-full h-full object-cover"
                    src={getCroppedImages(game.background_image)}
                    alt=""
                  />
                </div>
                <div className="px-4 py-3 pb-6">
                  <p className="font-bold text-xl">{game.name}</p>
                  <div className="">
                    <div className="flex items-center justify-between ">
                      <div>
                        {game.parent_platforms.map((item) => {
                          const Icon = iconMap[item.platform.slug];
                          return (
                            <div
                              key={item.platform.id}
                              className="inline-block mr-3 my-3"
                            >
                              <Icon
                                size={20}
                                className="text-gray-500 hover:text-white hover:cursor-pointer hover:scale-110 transition-all duration-150"
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <Critic game={game.metacritic} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default GameGrid;
