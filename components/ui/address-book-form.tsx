import React from 'react'

const AddressBookForm = () => {
    return (
        <form action="" className='flex flex-col gap-4 justify-center'>
            <label htmlFor="name" className='mb-[-0.5rem]'>Name:</label>
            <input type="text" name="name" placeholder='Name' className='border border-gray-400 rounded-lg h-7 pl-2' />
            <label htmlFor="address" className='mb-[-0.5rem]'>Wallet address:</label>
            <input type="text" name="address" placeholder='Address' className='border border-gray-400 rounded-lg h-7 mb-20 pl-2' />
            <div className='flex justify-center'>
                <button onSubmit={() => { }} className='text-[#3b92b4] text-xl h-10 w-24 border border-gray-200 rounded-2xl shadow-md'>Save</button>
            </div>
        </form>
    )
}

export default AddressBookForm
