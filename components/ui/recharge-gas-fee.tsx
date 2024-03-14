import { useState } from "react";

const RechargeGasFee = () => {
  const [isButtonMounted, setIsButtonMounted] = useState(true);

  const unmountButton = () => {
    setIsButtonMounted(false);
  };
  return (
    <>
      {isButtonMounted ? (
        <div
          className="absolute w-60 h-10 p-1 bg-red-400 rounded-lg cursor-pointer"
          onClick={unmountButton}
        >
          <a href="https://faucet.polygon.technology/" target="_blank">
            <p className="text-white text-center text-lg animate-pulse ">
              Recharge gas fee currency
            </p>
          </a>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default RechargeGasFee;
