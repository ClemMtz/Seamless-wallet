"use client";

import { useRouter } from "next/navigation";

import { useMagic } from "@/provider/magic-provider";
import { useCallback, useEffect, useState } from "react";

import { logout } from "@/utils/common";
import Buttons from "./buttons";
import TransactionHistory from "./transaction-history";
import UserInfos from "./user-info";

import { PiAddressBookLight } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";

import { GetUsdcTransaction } from "@/actions/get-usdc-transaction";
import { usePublicAddress } from "@/hooks/use-public-address";
import useStore from "@/store";
import RechargeGasFee from "./ui/recharge-gas-fee";

const Dashboard = () => {
  const { setToken, setBalance, setIsUnmounted } = useStore();
  const [maticBalance, setMaticBalance] = useState("0");
  const [isMaticBalanceLoaded, setIsMaticBalanceLoaded] = useState(false);

  const { magic, web3 } = useMagic();
  const publicAddress = usePublicAddress();
  const router = useRouter();
  const apiKey = process.env.API_TOKEN_POLYGON;

  const getMaticBalance = useCallback(async () => {
    if (publicAddress && web3) {
      try {
        const balanceInWei = await web3.eth.getBalance(publicAddress);
        const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
        setIsMaticBalanceLoaded(true);
        setMaticBalance(balanceInEther);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  }, [web3, publicAddress]);

  useEffect(() => {
    getMaticBalance();
  }, [getMaticBalance]);

  const getBalance = useCallback(async () => {
    if (publicAddress && web3) {
      try {
        const usdcBalance = await GetUsdcTransaction({
          module: "account",
          action: "tokentx",
          contractaddress: "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97",
          address: publicAddress,
          page: 1,
          offset: 5,
          sort: "asc",
          apikey: apiKey,
        });
        let sum = 0;
        usdcBalance.result.forEach((item: any) => {
          const value = parseFloat(item.value);
          if (item.from === publicAddress.toLocaleLowerCase()) {
            if (!isNaN(value)) {
              sum += value;
            } else {
              console.error("Invalid value:", item.value);
            }
          } else {
            const subtractValue = Math.abs(value);
            sum -= subtractValue;
          }
        });
        let formattedSum: string;

        if (Math.abs(sum) >= 1000000) {
          if (Math.abs(sum) % 1000000 === 0) {
            formattedSum = (Math.abs(sum) / 1000000).toString();
          } else {
            formattedSum = (Math.abs(sum) / 1000000).toFixed(1);
          }
        } else {
          formattedSum = Math.abs(sum).toString();
        }

        setBalance(formattedSum);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    }
  }, [publicAddress, web3, setBalance, apiKey]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  useEffect(() => {
    const checkLoginandGetBalance = async () => {
      const isLoggedIn = await magic?.user.isLoggedIn();
      if (isLoggedIn) {
        try {
          const metadata = await magic?.user.getInfo();
          if (metadata) {
            localStorage.setItem("user", metadata?.publicAddress!);

            await getBalance();
          }
        } catch (e) {
          console.error("error in fetching address: " + e);
        }
      }
    };
    checkLoginandGetBalance();
  }, [magic, getBalance]);

  const showAddress = () => {
    magic?.wallet.showAddress();
  };

  const sendToken = () => {
    magic?.wallet
      .showSendTokensUI()
      .then(async () => {
        await getBalance();
      })
      .catch((error) => {
        console.error("Error sending tokens:", error);
      });
  };

  const openAccountOptions = () => {
    router.push("/account");
    setIsUnmounted(false);
  };

  const openAddressBook = () => {
    router.push("/adressBook");
    setIsUnmounted(false);
  };

  const disconnect = useCallback(async () => {
    if (magic) {
      await logout(setToken, magic);
      router.push("/");
    }
  }, [magic, setToken, router]);

  return (
    <div className="bg-white h-screen w-screen">
      <div className="flex flex-row justify-between mb-20 p-6">
        <div className="flex flex-col justify-center items-center gap-4 h-24 w-10 border border-gray-200 rounded-2xl shadow-md">
          <button className="" onClick={openAccountOptions}>
            <VscAccount size={30} />
          </button>
          <button className="" onClick={openAddressBook}>
            <PiAddressBookLight size={33} />
          </button>
        </div>
        <button
          onClick={disconnect}
          className="text-[#3b92b4] text-lg h-10 w-24 border border-gray-200 rounded-2xl shadow-md"
        >
          Log out
        </button>
      </div>
      <div className="flex flex-col items-center">
        <UserInfos />
        {isMaticBalanceLoaded && maticBalance < "0.03" ? (
          <RechargeGasFee />
        ) : (
          ""
        )}
        <Buttons sendToken={sendToken} showAddress={showAddress} />
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Dashboard;
