import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import { iconVariants, wrapperVariants } from ".";
import usePlatform from "../hooks/usePlatform";
import Sort from "./Sort";
import selectContext from "../state-management/contexts/selectedContext";

const Sorting = () => {
  const { selected } = useContext(selectContext);
  const [open, setOpen] = useState(false);

  const sortOrder = [
    { value: "", label: "Relevance" },
    { value: "-added", label: "Date added" },
    { value: "name", label: "Name" },
    { value: "-released", label: "Release data" },
    { value: "-metacritic", label: "Popularity" },
    { value: "-rating", label: "Average rating" },
  ];

  const { error } = usePlatform();
  if (error) {
    return null;
  }
  return (
    <>
      <div className="flex items-center pl-5  ">
        <motion.div
          animate={open ? "open" : "closed"}
          className="relative z-50"
        >
          <button
            onClick={() => setOpen((pv) => !pv)}
            className={`flex items-center gap-2 px-5 py-2   rounded-md  bg-transparent border hover:bg-gray-900 hover:text-white ${
              selected === true ? "text-gray-100" : "text-gray-700"
            } transition-colors `}
          >
            <span className="font-medium text-sm ">Order by: Relevance</span>
            <motion.span variants={iconVariants}>
              <FiChevronDown />
            </motion.span>
          </button>

          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
            style={{ originY: "top", translateX: "-50%" }}
            className="flex flex-col gap-2 p-2  rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
          >
            {sortOrder.map((st) => (
              <Sort
                st={st}
                key={st.value}
                setOpen={setOpen}
                title={st.label}
              ></Sort>
            ))}

            {/* <Option setOpen={setOpen} Icon={FiPlusSquare} text="Duplicate" />
          <Option setOpen={setOpen} Icon={FiShare} text="Share" />
          <Option setOpen={setOpen} Icon={FiTrash} text="Remove" /> */}
          </motion.ul>
        </motion.div>
      </div>
    </>
  );
};

export default Sorting;
