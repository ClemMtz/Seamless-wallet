"use client";

import { LoginProps } from '@/utils/types';
import { logout } from '@/utils/common';
import { useMagic } from '@/provider/magic-provider';
import { useCallback, useEffect, useState } from 'react';

import { FiPlus } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { GoArrowDown } from "react-icons/go";
import TransactionHistory from './ui/transaction-history';





export default function Dashboard({ setToken }: LoginProps) {
    const { magic, web3 } = useMagic();
    const [balance, setBalance] = useState('...');

    const [publicAddress, setPublicAddress] = useState(localStorage.getItem('user'));

    function truncateAddress(publicAddress: any) {
        const maxLength = 20;
        if (publicAddress?.length <= maxLength) {
            return publicAddress;
        }
        const truncatedAddress = `${publicAddress?.substring(0, maxLength / 2)}...${publicAddress?.substring(publicAddress?.length - maxLength / 2)}`;
        return truncatedAddress;
    }

    const disconnect = useCallback(async () => {
        if (magic) {
            await logout(setToken, magic);
        }
    }, [magic, setToken]);

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
                    console.log('error in fetching address: ' + e);
                }
            }
        };
        setTimeout(() => checkLoginandGetBalance(), 5000);
    }, []);

    const getBalance = useCallback(async () => {
        if (publicAddress && web3) {
            const balance = await web3.eth.getBalance(publicAddress);
            if (balance == BigInt(0)) {
                setBalance('0');
            } else {
                setBalance(web3.utils.fromWei(balance, 'ether'));
            }
            console.log('BALANCE: ', balance);
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
        setBalance('...');
    }, [magic]);

    const showAdress = () => {
        magic?.wallet.showAddress()
    }

    return (
        <div className="bg-white h-screen w-screen">
            <div className='flex justify-end p-4'>
                <button className='w-24 h-10 rounded-lg  text-[#296982] text-xl mb-28' onClick={disconnect}>Log out</button>
            </div>
            <div className='flex flex-col items-center'>
                <div className='font-bold  text-[3rem] mb-2'>$ {balance.substring(0, 7)}</div>
                <div className='text-gray-500 mb-24'>
                    {publicAddress?.length == 0 ?
                        'Fetching address..'
                        :
                        truncateAddress(publicAddress)
                    }
                </div>
                <div className='flex flex-row gap-16 mb-16'>
                    <button className='flex flex-col items-center gap-2'>
                        <div className='w-14 h-14 bg-gray-200 rounded-full flex justify-center items-center'><FiPlus size={35} style={{ color: "" }} /></div>
                        <h1 className='text-gray-700'>Add</h1>
                    </button>
                    <button className='flex flex-col items-center gap-2'>
                        <div className='w-14 h-14 bg-gray-200 rounded-full flex justify-center items-center'><FiSend size={30} style={{ color: "" }} /></div>
                        <h1 className='text-gray-700'>Send</h1>
                    </button>
                    <button className='flex flex-col items-center gap-2.5' onClick={showAdress}>
                        <div className='w-14 h-14 bg-gray-200 rounded-full flex justify-center items-center'><GoArrowDown size={40} style={{ color: "" }} /></div>
                        <div className='text-gray-700'>Receive</div>
                    </button>
                </div>
                <TransactionHistory />
            </div>
        </div>
    );
}