import React from 'react'
import { TransactionHistoryTypes } from '@/utils/types';

const UserInfos = ({ balance, truncateAddress, publicAddress }: TransactionHistoryTypes) => {

    return (
        <div className='flex flex-col items-center'>
            <div className='font-bold  text-[3rem] mb-2'> $ {balance.substring(0, 7)}</div>
            <div className='text-gray-500 mb-10'>
                {publicAddress?.length == 0 ?
                    'Fetching address..'
                    :
                    truncateAddress(publicAddress as string)
                }
            </div>
        </div>
    )
}

export default UserInfos;
