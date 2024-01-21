"use client";

import { useState } from 'react'

import showToast from '@/utils/show-toast';
import { AddressBookFormProps } from '@/utils/types';

import axios from 'axios';



const AddressBookForm = ({ closeAddressBookModal }: AddressBookFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
    });


    const { name, address } = formData;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post("/api/addressBook", formData);

            showToast({
                message: 'AddressBook successfully created!',
                type: 'success',
            });

            closeAddressBookModal();
        } catch (error) {
            showToast({
                message: 'Something went wrong. Please try again',
                type: 'error',
            });
        }
    };


    return (
        <form onSubmit={onSubmit} className='flex flex-col gap-4 justify-center'>
            <label
                htmlFor="name"
                className='mb-[-0.5rem]'
            >
                Name:
            </label>
            <input
                type="text"
                name="name"
                placeholder='Name'
                value={name}
                onChange={handleChange}
                className='border border-gray-400 rounded-lg h-7 pl-2'
            />

            <label
                htmlFor="address"
                className='mb-[-0.5rem]'
            >
                Wallet address:
            </label>
            <input
                type="text"
                name="address"
                placeholder='Address'
                value={address}
                onChange={handleChange}
                className='border border-gray-400 rounded-lg h-7 mb-20 pl-2'
            />
            <div className='flex justify-center'>
                <button
                    type="submit"
                    className='text-[#3b92b4] text-xl h-10 w-24 border border-gray-200 rounded-2xl shadow-md disabled:opacity-50'
                    disabled={name && address ? false : true}
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default AddressBookForm
