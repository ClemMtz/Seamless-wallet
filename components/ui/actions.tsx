import React from 'react'

import { FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";

const Actions = ({ copyToClipboard, address, openAddressBookModal }: any) => {
    return (
        <div className='h-32 w-20 bg-white border border-gray-200 rounded-lg absolute right-10'>
            <div className='flex flex-row justify-center items-center h-10 gap-1'>
                <button onClick={() => copyToClipboard(address)}><FaRegCopy size={20} /></button>
                <p>Copy</p>
            </div>
            <hr />
            <div className='flex flex-row justify-center items-center h-10 gap-1'>
                <button><GrDocumentUpdate size={20} onClick={openAddressBookModal} /></button>
                <p>Update</p>
            </div>
            <hr />
            <div className='flex flex-row justify-center items-center h-10 gap-1'>
                <button><RiDeleteBin6Line size={20} /></button>
                <p>delete</p>
            </div>



        </div>
    )
}

export default Actions
