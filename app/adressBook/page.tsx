"use client";

import AddressBookTable from '@/components/ui/address-book-table';
import { useRouter } from 'next/navigation';
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";


const Account = () => {
    const router = useRouter();

    const closeAddressBook = () => {
        router.push("/");
    }

    const columns = ['Name', 'Address'];
    const rows = "";

    return (
        <div className='h-screen w-screen bg-white'>
            <div className='flex justify-end p-4 mb-14'>
                <button onClick={closeAddressBook} className='h-10 w-10 border border-gray-200 rounded-full  flex justify-center items-center shadow'>
                    <RxCross2 size={30} />
                </button>
            </div>
            <div className=' gap-4 p-4'>
                <div className='flex flex-row justify-between items-center mb-4'>
                    <h1 className='text-bold text-xl'>Address Book</h1>
                    <button className='h-10 w-10 border border-gray-200 rounded-full  flex justify-center items-center shadow'>
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