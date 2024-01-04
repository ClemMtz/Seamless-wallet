import React from 'react'

const UserInfos = ({ balance, publicAddress, truncateAddress }: any) => {

    return (
        <div className='flex flex-col items-center'>
            <div className='font-bold  text-[3rem] mb-2'>$ {balance.substring(0, 7)}</div>
            <div className='text-gray-500 mb-24'>
                {publicAddress?.length == 0 ?
                    'Fetching address..'
                    :
                    truncateAddress(publicAddress)
                }
            </div>
        </div>
    )
}

export default UserInfos;
