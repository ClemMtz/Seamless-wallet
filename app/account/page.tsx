"use client";

import { useRouter } from 'next/navigation';
import { RxCross2 } from "react-icons/rx";

import UpdateEmail from '@/components/update-email';

const Account = () => {
    const router = useRouter();

    const closeAccountOptions = () => {
        router.push("/");
    }

    return (
        <div className='h-screen w-screen bg-white'>
            <div className='flex justify-end p-4 mb-14'>
                <button onClick={closeAccountOptions} className='h-10 w-10 border border-gray-200 rounded-full  flex justify-center items-center shadow'>
                    <RxCross2 size={30} />
                </button>
            </div>
            <div className='pr-16 pl-8'>
                <UpdateEmail />
            </div>
        </div>
    )
}

export default Account;
