"use client";

import { useRouter } from 'next/navigation';
import { RxCross2 } from "react-icons/rx";


const Account = () => {
    const router = useRouter();

    const closeAddressBook = () => {
        router.push("/");
    }

    return (
        <div className='h-screen w-screen bg-white'>
            <div className='flex justify-end p-4 mb-14'>
                <button onClick={closeAddressBook}><RxCross2 size={30} /></button>
            </div>

        </div>
    )
}

export default Account;