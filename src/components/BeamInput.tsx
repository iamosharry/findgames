import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useContext, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";
import selectContext from "../state-management/contexts/selectedContext";

interface Props {
  onSearch: (searchText: string) => void;
}
const BeamInput = ({ onSearch }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { selected } = useContext(selectContext);

  const turn = useMotionValue(0);

  useEffect(() => {
    animate(turn, 1, {
      ease: "linear",
      duration: 5,
      repeat: Infinity,
    });
  }, []);

  const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #a78bfa00 75%, indigo 100%)`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (inputRef.current) {
          onSearch(inputRef.current?.value);
        }
      }}
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
      className="relative flex w-full  items-center gap-2 rounded-full border border-gray-300   py-1.5 pl-6 pr-1.5"
    >
      {/* border-white/20 */}
      <input
        ref={inputRef}
        placeholder="Search games..."
        className={`w-full bg-transparent text-sm  focus:outline-0 ${
          selected === false
            ? "text-black placeholder-black/80 font-semibold"
            : "text-white placeholder-white/80"
        }`}
      />

      <button
        onClick={(e) => e.stopPropagation()}
        type="submit"
        className="group flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-br from-gray-500 to-gray-400 px-4 py-3 text-sm font-medium text-gray-900 transition-transform active:scale-[0.985]"
      >
        <span>
          <BsSearch />
        </span>
        <FiArrowRight className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100 group-active:-rotate-45" />
      </button>

      <div className="pointer-events-none absolute inset-0 z-10 rounded-full">
        <motion.div
          style={{
            backgroundImage,
          }}
          className="mask-with-browser-support absolute -inset-[1px] rounded-full border border-transparent bg-origin-border"
        />
      </div>
    </form>
  );
};

export default BeamInput;
