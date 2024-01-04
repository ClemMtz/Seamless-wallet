import React from 'react'
import { FiPlus } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { GoArrowDown } from "react-icons/go";


const Buttons = ({ sendToken, showAdress }) => {
    return (
        <div className='flex flex-row gap-16 mb-16'>
            <button className='flex flex-col items-center gap-2'>
                <div className='w-14 h-14 bg-gray-200 rounded-full flex justify-center items-center'><FiPlus size={35} style={{ color: "" }} /></div>
                <h1 className='text-gray-700'>Add</h1>
            </button>
            <button className='flex flex-col items-center gap-2' onClick={sendToken}>
                <div className='w-14 h-14 bg-gray-200 disabled:opacity-40 rounded-full flex justify-center items-center'><FiSend size={30} style={{ color: "" }} /></div>
                <h1 className='text-gray-700'>Send</h1>
            </button>
            <button className='flex flex-col items-center gap-2.5' onClick={showAdress}>
                <div className='w-14 h-14 bg-gray-200 rounded-full flex justify-center items-center'><GoArrowDown size={40} style={{ color: "" }} /></div>
                <div className='text-gray-700'>Receive</div>
            </button>
        </div>
    )
}

export default Buttons;
