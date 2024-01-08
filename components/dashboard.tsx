"use client";

import { useRouter } from 'next/navigation';

import { useMagic } from '@/provider/magic-provider';
import { useCallback, useEffect, useState } from 'react';

import { logout } from '@/utils/common';
import UserInfos from './user-info';
import Buttons from './buttons'
import TransactionHistory from './transaction-history';

import { VscAccount } from "react-icons/vsc";
import { LoginProps } from '@/utils/types';
import { API_MATIC_TO_DOLLAR } from '@/utils/api-urls';


export default function Dashboard({ setToken }: LoginProps) {
    const { magic, web3 } = useMagic();
    const router = useRouter();

    const [balance, setBalance] = useState("");
    const [publicAddress, setPublicAddress] = useState(localStorage.getItem('user'));

    function truncateAddress(publicAddress: string) {
        const maxLength = 20;
        if (publicAddress?.length <= maxLength) {
            return publicAddress;
        }
        const truncatedAddress = `${publicAddress?.substring(0, maxLength / 2)}...${publicAddress?.substring(publicAddress?.length - maxLength / 2)}`;
        return truncatedAddress;
    }

    useEffect(() => {
        const checkLoginandGetBalance = async () => {
            const isLoggedIn = await magic?.user.isLoggedIn();
            if (isLoggedIn) {
                try {
                    const metadata = await magic?.user.getInfo();
                    if (metadata) {
                        localStorage.setItem('user', metadata?.publicAddress!);
                        setPublicAddress(metadata?.publicAddress!);
                    }
                } catch (e) {
                    console.error('error in fetching address: ' + e);
                }
            }
        };
        setTimeout(() => checkLoginandGetBalance(), 5000);
    }, []);

    const getBalance = useCallback(async () => {
        if (publicAddress && web3) {
            const balanceInWei = await web3.eth.getBalance(publicAddress);
            const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');

            const response = await fetch(API_MATIC_TO_DOLLAR);
            const exchangeRateData = await response.json();
            const exchangeRate = exchangeRateData.USD;

            const balanceInUSD = (parseFloat(balanceInEther) * exchangeRate).toFixed(2);

            setBalance(balanceInUSD);
        }
    }, [web3, publicAddress]);

    const showBalance = useCallback(async () => {
        await getBalance();
    }, [getBalance]);

    useEffect(() => {
        if (web3) {
            showBalance();
        }
    }, [web3]);

    useEffect(() => {
        setBalance("");
    }, [magic]);

    const showAdress = () => {
        magic?.wallet.showAddress()
    };

    const sendToken = () => {
        magic?.wallet.showSendTokensUI()
    };

    const openAccountOptions = () => {
        router.push("/account");
    };

    const disconnect = useCallback(async () => {
        if (magic) {
            await logout(setToken, magic);
            router.push("/");
        }
    }, [magic, setToken]);


    return (
        <div className="bg-white h-screen w-screen">
            <div className='flex flex-row justify-between mb-24 p-6'>
                <button className='' onClick={openAccountOptions}><VscAccount size={30} /></button>
                <button onClick={disconnect} className='text-[#3b92b4] text-lg'>Log out</button>
            </div>
            <div className='flex flex-col items-center'>
                <UserInfos truncateAddress={truncateAddress} balance={balance} publicAddress={publicAddress} />
                <Buttons sendToken={sendToken} showAdress={showAdress} />
                <TransactionHistory balance={balance} />
            </div>
        </div>

    );
}