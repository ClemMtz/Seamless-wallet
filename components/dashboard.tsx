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

import { API_MATIC_TO_DOLLAR } from "@/utils/api-urls";
import { LoginProps } from "@/utils/types";

import { UseTruncateAddress } from "@/hooks/use-truncate-address";

const Dashboard = ({ setToken }: LoginProps) => {
  const { magic, web3 } = useMagic();
  const router = useRouter();
  const truncateAddress = UseTruncateAddress();

  const [balance, setBalance] = useState("");

  const [publicAddress, setPublicAddress] = useState(
    localStorage.getItem("user")
  );

  const getBalance = useCallback(async () => {
    if (publicAddress && web3) {
      const balanceInWei = await web3.eth.getBalance(publicAddress);
      const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");

      const response = await fetch(API_MATIC_TO_DOLLAR);
      const exchangeRateData = await response.json();
      const exchangeRate = exchangeRateData.USD;

      let balanceInUSD = parseFloat(balanceInEther) * exchangeRate;

      if (balanceInUSD < 0.01) {
        balanceInUSD = 0;
      }

      setBalance(balanceInUSD.toFixed(2));
    }
  }, [publicAddress, web3]);

  useEffect(() => {
    const checkLoginandGetBalance = async () => {
      const isLoggedIn = await magic?.user.isLoggedIn();
      if (isLoggedIn) {
        try {
          const metadata = await magic?.user.getInfo();
          if (metadata) {
            localStorage.setItem("user", metadata?.publicAddress!);
            setPublicAddress(metadata?.publicAddress!);

            await getBalance();
          }
        } catch (e) {
          console.error("error in fetching address: " + e);
        }
      }
    };
    checkLoginandGetBalance();
  }, [magic, getBalance]);

  useEffect(() => {
    const updateBalance = async () => {
      if (publicAddress && web3) {
        await getBalance();
      }
    };

    updateBalance();
  }, [publicAddress, web3, balance, getBalance]);

  useEffect(() => {
    const resetBalance = () => {
      setBalance("");
    };

    resetBalance();
  }, [magic]);

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
  };

  const openAddressBook = () => {
    router.push("/adressBook");
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
        <UserInfos
          truncateAddress={truncateAddress}
          balance={balance}
          publicAddress={publicAddress}
        />
        <Buttons
          sendToken={sendToken}
          showAddress={showAddress}
          balance={balance}
        />
        <TransactionHistory
          balance={balance}
          truncateAddress={truncateAddress}
          publicAddress={publicAddress}
        />
      </div>
    </div>
  );
};

export default Dashboard;
