"use client";

import { LoginProps } from '@/utils/types';
import { logout } from '@/utils/common';
import { useMagic } from '@/provider/magic-provider';
import { useCallback, useEffect, useState } from 'react';





export default function Dashboard({ token, setToken }: LoginProps) {
    const { magic, web3 } = useMagic();
    const [balance, setBalance] = useState('...');

    const [publicAddress, setPublicAddress] = useState(localStorage.getItem('user'));

    function truncateAddress(publicAddress: any) {
        const maxLength = 20;
        if (publicAddress.length <= maxLength) {
            return publicAddress;
        }
        const truncatedAddress = `${publicAddress.substring(0, maxLength / 2)}...${publicAddress.substring(publicAddress.length - maxLength / 2)}`;
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

    return (
        <div className="bg-white h-screen w-screen">
            <div className='flex justify-end p-4'>
                <button className='w-24 h-10 rounded-lg bg-sky-800 text-white text-xl mb-10' onClick={disconnect}>Log out</button>
            </div>
            <div className='flex flex-col items-center'>
                <div className='font-bold  text-[3rem] mb-2'>$ {balance.substring(0, 7)}</div>
                <div className='text-gray-500'>
                    {publicAddress?.length == 0 ?
                        'Fetching address..'
                        :
                        truncateAddress(publicAddress)
                    }
                </div>
            </div>
        </div>
    );
}