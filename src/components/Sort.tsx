import { motion } from "framer-motion";
import { actionIconVariants, itemVariants } from ".";

interface Props {
  setOpen: (arg: boolean) => void;
  title: string;
}
const Sort = ({ setOpen, title }: Props) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => setOpen(false)}
      className="flex items-center  gap-2 w-full p-2  font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}></motion.span>
      <span>{title}</span>
    </motion.li>
  );
};
export default Sort;
