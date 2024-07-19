import useGenres, { Genres } from "../hooks/useGenres";
import GenresSkeleton from "./GenresSkeleton";

interface Props {
  setSelectedGenres: (item: Genres) => void;
  selectedGenres: Genres | null;
}
const GenreList = ({ setSelectedGenres, selectedGenres }: Props) => {
  const { data, error, isLoading } = useGenres();
  if (error) {
    return null;
  }
  return (
    <>
      {isLoading && <GenresSkeleton />}
      <ul className="py-4 px-8">
        {data?.map((item) => (
          <li
            className="font-medium  flex items-center mb-5 gap-x-4 h-[50px] "
            key={item.id}
          >
            <img
              className="w-[60px] h-full object-cover rounded-xl"
              src={item.image_background}
              alt=""
            />
            <button
              className={
                item.id === selectedGenres?.id
                  ? "font-bold text-white-600"
                  : "font-normal text-gray-500"
              }
              onClick={() => setSelectedGenres(item)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GenreList;
