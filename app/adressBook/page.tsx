"use client";

import AddressBookTable from '@/components/ui/address-book-table';
import { useRouter } from 'next/navigation';
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { useState, useEffect } from 'react';
import AddressBookModal from '@/components/ui/address-book-modal';
import { getAddressBook } from '@/actions/get-address-book';
import { AddressBookData } from "@/utils/types";
import { UsePublicAddress } from '@/hooks/public-address';


const Account = () => {
    const [isOpenAddressBookModal, setIsOpenAddressBookModal] = useState(false);
    const [addressBookData, setAddressBookData] = useState<AddressBookData[]>([]);

    const router = useRouter();
    const publicAddress = UsePublicAddress();

    useEffect(() => {
        const fetchAddressBookData = async () => {
            try {


                const addresBook = await getAddressBook();

                setAddressBookData(addresBook as AddressBookData[]);
            } catch (error) {
                console.error('Error fetching transactions:', error);

            }
        };

        fetchAddressBookData();

    }, []);


    const openAddressBookModal = () => {
        setIsOpenAddressBookModal((prev: boolean) => prev = true);
    }


    const closeAddressBook = () => {
        router.push("/");
    }

    const columns = ['Name', 'Address', 'Actions'];
    const rows = addressBookData.map((addressBook) => {
        const publicAddressData = addressBook.publicAddress;

        if (publicAddressData === publicAddress) {
            return {
                Name: addressBook.name,
                Address: addressBook.address,
                Action: "",
            };

        }
        return "";
    });

    return (
        <div className='h-screen w-screen bg-white'>

            {isOpenAddressBookModal ? <AddressBookModal setIsOpenAddressBookModal={setIsOpenAddressBookModal} /> : ""}

            <div className='flex justify-end p-4 mb-14'>
                <button onClick={closeAddressBook} className='h-10 w-10 border border-gray-200 rounded-full  flex justify-center items-center shadow'>
                    <RxCross2 size={30} />
                </button>
            </div>
            <div className=' gap-4 p-4'>
                <div className='flex flex-row justify-between items-center mb-4'>
                    <h1 className='text-bold text-xl'>Address Book</h1>
                    <button className='h-10 w-10 border border-gray-200 rounded-full  flex justify-center items-center shadow' onClick={openAddressBookModal}>
                        <FiPlus size={30} />
                    </button>
                </div>
                <div>
                    <hr />
                    <AddressBookTable columns={columns} rows={rows} />
                </div>
            </div>

        </div>
    )
}

export default Account;