import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";

interface Props {
  handleSelect: () => void;
  removeSelect: () => void;
  selected: boolean;
}
const SliderToggle = ({ handleSelect, selected, removeSelect }: Props) => {
  selected;
  return (
    <div className="relative  flex w-fit items-center rounded-full space-x-10 py-2 ">
      <div
        className={`cover bg-gradient-to-r from-violet-600 to-indigo-600 ${
          selected === true ? "active" : "inactive"
        } `}
      ></div>
      <button
        onClick={removeSelect}
        className={`flex space-x-2 items-center ${selected && "text-white"}`}
      >
        <FiSun
          className={`relative z-10 text-lg md:text-sm ${
            !selected && "text-white"
          }`}
        />
        <span className={`relative z-10 ${!selected && "text-white"}`}>
          Light
        </span>
      </button>
      <button
        onClick={handleSelect}
        className={`flex space-x-2 items-center ${selected && "text-white"}`}
      >
        <FiMoon className="relative z-10 text-lg md:text-sm" />
        <span className="relative z-10">Dark</span>
      </button>
      <div>
        <motion.span
          layout
          transition={{ type: "spring", damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default SliderToggle;
