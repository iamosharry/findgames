interface Props {
  game: number;
}
const Critic = ({ game }: Props) => {
  return (
    <>
      <div
        className={`font-semibold p-1 px-2 bg-gray-900 rounded-md transform hover:rotate-6 hover:cursor-pointer  ${
          game > 75 ? "text-green-500" : game > 60 ? "text-yellow-500" : ""
        }`}
      >
        {game}
      </div>
    </>
  );
};

export default Critic;
