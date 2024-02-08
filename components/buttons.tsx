import useStore from "@/store";
import { ButtonTypes } from "@/utils/types";
import { FiPlus, FiSend } from "react-icons/fi";
import { GoArrowDown } from "react-icons/go";

const Buttons = ({ sendToken, showAddress }: ButtonTypes) => {
  const { balance } = useStore();
  return (
    <div className="flex flex-row gap-16 mb-10">
      <a href="https://global.transak.com/" target="_blank">
        <button className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 bg-gray-200 rounded-full flex justify-center items-center shadow-[#3b92b4ca] shadow-md">
            <FiPlus size={35} />
          </div>
          <h1 className="text-gray-700">Add</h1>
        </button>
      </a>
      <button
        className="flex flex-col items-center gap-2"
        onClick={sendToken}
        disabled={balance <= "0.0"}
      >
        <div
          className={`w-14 h-14 bg-gray-200 disabled:opacity-40 rounded-full flex justify-center items-center shadow-[#3b92b4ca] shadow-md ${
            balance <= "0.0" ? "opacity-40" : ""
          }`}
        >
          <FiSend size={30} />
        </div>
        <h1 className="text-gray-700">Send</h1>
      </button>
      <button
        className="flex flex-col items-center gap-2.5"
        onClick={showAddress}
      >
        <div className="w-14 h-14 bg-gray-200 rounded-full flex justify-center items-center shadow-[#3b92b4ca] shadow-md">
          <GoArrowDown size={40} />
        </div>
        <div className="text-gray-700">Receive</div>
      </button>
    </div>
  );
};

export default Buttons;
