import { motion } from "framer-motion";
import { actionIconVariants, itemVariants } from ".";

import { Results } from "./PlatformSelector";
import { useContext } from "react";
import selectContext from "../state-management/contexts/selectedContext";

interface Props {
  text: string;
  plat: Results;
  setSelectedPlatform: (event: Results | null) => void;

  setOpen: (arg: boolean) => void;
}
const Option = ({ text, setOpen, plat, setSelectedPlatform }: Props) => {
  const { selected } = useContext(selectContext);
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className={`flex items-center ${
        selected && "text-gray-700"
      }   gap-2 w-full p-2 font-medium whitespace-nowrap rounded-md hover:bg-indigo-100  hover:text-indigo-500 transition-colors cursor-pointer`}
    >
      <motion.span variants={actionIconVariants}></motion.span>
      <span onClick={() => setSelectedPlatform(plat)}>{text}</span>
    </motion.li>
  );
};
export default Option;
