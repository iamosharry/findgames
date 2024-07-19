import BarLoader from "./BarLoader";

const LoadingSkeleton = () => {
  return (
    <div className=" h-[376px]  w-full rounded-md flex justify-center items-center bg-slate-900">
      <BarLoader />
    </div>
  );
};

export default LoadingSkeleton;
