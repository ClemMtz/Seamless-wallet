import React from 'react'
import { TransactionHistoryTypes } from '@/utils/types';

const UserInfos = ({ balance, truncateAdress, publicAdress }: any) => {

    return (
        <div className='flex flex-col items-center'>
            <div className='font-bold  text-[3rem] mb-2'>$ {balance.substring(0, 7)}</div>
            <div className='text-gray-500 mb-24'>
                {publicAdress?.length == 0 ?
                    'Fetching address..'
                    :
                    truncateAdress(publicAdress)
                }
            </div>
        </div>
    )
}

export default UserInfos;
