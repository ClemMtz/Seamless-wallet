import { ButtonTypes } from '@/utils/types';
import React from 'react'
import { FiPlus } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { GoArrowDown } from "react-icons/go";


const Buttons = ({ sendToken, showAddress, balance }: ButtonTypes) => {
    console.log(balance)
    return (
        <div className='flex flex-row gap-16 mb-16'>
            <a href="https://global.transak.com/" target="_blank">
                <button className='flex flex-col items-center gap-2'>
                    <div className='w-14 h-14 bg-gray-200 rounded-full flex justify-center items-center'><FiPlus size={35} /></div>
                    <h1 className='text-gray-700'>Add</h1>
                </button>
            </a>
            <button className='flex flex-col items-center gap-2' onClick={sendToken} disabled={balance <= "0.00"}>
                <div className={`w-14 h-14 bg-gray-200 disabled:opacity-40 rounded-full flex justify-center items-center ${balance <= "0.00" ? 'opacity-40' : ''}`}>
                    <FiSend size={30} />
                </div>
                <h1 className='text-gray-700'>Send</h1>
            </button>
            <button className='flex flex-col items-center gap-2.5' onClick={showAddress}>
                <div className='w-14 h-14 bg-gray-200 rounded-full flex justify-center items-center'><GoArrowDown size={40} /></div>
                <div className='text-gray-700'>Receive</div>
            </button>
        </div>
    )
}

export default Buttons;
