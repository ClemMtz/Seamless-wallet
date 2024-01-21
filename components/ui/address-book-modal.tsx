import React from 'react'

import { AddressBookModalProps } from '@/utils/types';

import { RxCross2 } from "react-icons/rx";

import AddressBookForm from './address-book-form';



const AddressBookModal = ({ setIsOpenAddressBookModal }: AddressBookModalProps) => {

    const closeAddressBookModal = () => {
        setIsOpenAddressBookModal((prev: boolean) => prev = false)
    };
    return (
        <div className=' absolute flex justify-center items-center h-screen w-screen bg-[#00000086]'>
            <div className='h-[30rem] w-[20rem] bg-white flex flex-col p-4 rounded-lg'>
                <div className='flex justify-end'>
                    <button
                        onClick={closeAddressBookModal}
                        className='h-10 w-10 border border-gray-200 rounded-full  flex justify-center items-center shadow mb-14'
                    >
                        <RxCross2 size={30} />
                    </button>
                </div>
                <AddressBookForm closeAddressBookModal={closeAddressBookModal} />
            </div>
        </div>
    )
}

export default AddressBookModal;
