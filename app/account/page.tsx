"use client";

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { RxCross2 } from "react-icons/rx";

import { logout } from '@/utils/common';
import { useMagic } from '@/provider/magic-provider';

const Account = () => {
    const router = useRouter();
    const { magic } = useMagic();
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('token') ?? '');
    }, [setToken]);

    const closeAccountOptions = () => {
        router.push("/");
    }

    const disconnect = useCallback(async () => {
        if (magic) {
            await logout(setToken, magic);
            router.push("/");
        }
    }, [magic, setToken]);

    return (
        <div className='h-screen w-screen bg-white'>
            <div className='flex justify-end p-4'>
                <button onClick={closeAccountOptions}><RxCross2 size={30} /></button>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <button onClick={disconnect} className='text-red-500 text-3xl'>Log out</button>
            </div>
        </div>
    )
}

export default Account;
