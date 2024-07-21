import logo from "../assets/logo.webp";
import BeamInput from "./BeamInput";
import SliderToggle from "./SliderToggle";

interface Props {
  onSearch: (searchText: string) => void;
}

const Navbar = ({ onSearch }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between  px-2 py-5   lg:px-7 ">
        <div className="flex items-center gap-x-2 w-[15%] ">
          <img className="w-[60px]" src={logo} alt="logo" />
          <h1>NavBar</h1>
        </div>
        <div className="hidden lg:flex h-full items-center justify-center  px-4 w-[70%]">
          <BeamInput onSearch={onSearch} />
        </div>
        <div className="">
          <SliderToggle />
        </div>
      </div>
    </>
  );
};

export default Navbar;
