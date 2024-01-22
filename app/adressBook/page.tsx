"use client";

import AddressBookTable from '@/components/ui/address-book-table';
import { useRouter } from 'next/navigation';
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { useState, useEffect } from 'react';
import Modal from '@/components/ui/modal';
import { getAddressBook } from '@/actions/get-address-book';
import { AddressBookData } from "@/utils/types";
import { UsePublicAddress } from '@/hooks/use-public-address';
import Actions from '@/components/ui/actions';
import showToast from '@/utils/show-toast';
import { UseTruncateAddress } from '@/hooks/use-truncate-address';


const Account = () => {
    const [isOpenAddressBookModal, setIsOpenAddressBookModal] = useState(false);
    const [addressBookData, setAddressBookData] = useState<AddressBookData[]>([]);
    const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
    const [copiedAddress, setCopiedAddress] = useState<string | null>(null);


    console.log(addressBookData)

    const router = useRouter();
    const publicAddress = UsePublicAddress();
    const truncateAddress = UseTruncateAddress();

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

        setIsOpenAddressBookModal(prev => prev = true);

    }

    const closeAddressBook = () => {
        router.push("/");
    }

    const openCloseActions = (actionId: string) => {
        setSelectedActionId((prev) => (prev === actionId ? null : actionId));
    }

    const copyToClipboard = (address: string) => {
        navigator.clipboard.writeText(address)
            .then(() => {
                setCopiedAddress(address);
                showToast({
                    message: 'Wallet address copied!',
                    type: 'success',
                });
                setTimeout(() => setCopiedAddress(null), 3000);
            })
            .catch((error) => {
                console.error('Error copying to clipboard:', error);
            });
    };

    const columns = ['Name', 'Address', 'Actions'];
    const rows = addressBookData.map((addressBook) => {
        const publicAddressData = addressBook.publicAddress;

        if (publicAddressData === publicAddress) {
            const actionId = addressBook.id;
            return {
                Name: addressBook.name,
                Address: truncateAddress(addressBook.address),
                Actions: (
                    <button onClick={() => openCloseActions(actionId)}>
                        {selectedActionId === actionId ? (
                            <>
                                <HiDotsVertical size={20} />
                                <Actions copyToClipboard={copyToClipboard} address={addressBook.address} openAddressBookModal={openAddressBookModal} />
                            </>
                        ) : (
                            <HiDotsVertical size={20} />
                        )}
                    </button>
                ),
            };

        }
        return "";
    });

    return (
        <div className='h-screen w-screen bg-white'>

            {isOpenAddressBookModal ? <Modal setIsOpenAddressBookModal={setIsOpenAddressBookModal} /> : ""}

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