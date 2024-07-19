import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Option from "./Option";
import { iconVariants, wrapperVariants } from ".";
import usePlatform from "../hooks/usePlatform";

export interface PlatformType {
  id: number;
  name: string;
  slug: string;
}
export interface Results {
  id: number;
  name: string;
  platforms: PlatformType[];
}

interface Props {
  setSelectedPlatform: (event: Results | null) => void;
  selectedPlatform: Results | null;
}

const PlatformSelector = ({ setSelectedPlatform, selectedPlatform }: Props) => {
  const [open, setOpen] = useState(false);

  const { data, error } = usePlatform();
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
            className="flex items-center gap-2 px-5 py-2   rounded-md text-indigo-50 bg-transparent border hover:bg-gray-900 transition-colors "
          >
            <span className="font-medium text-sm ">
              {selectedPlatform?.name || "Platforms"}
            </span>
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
            {data?.map((plat) => (
              <Option
                setOpen={setOpen}
                key={plat.id}
                text={plat.name}
                plat={plat}
                setSelectedPlatform={setSelectedPlatform}
              />
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

export default PlatformSelector;
