"use client";

import { getAddressBook } from "@/actions/get-address-book";
import Actions from "@/components/ui/actions";
import AddressBookForm from "@/components/ui/address-book-form";
import AddressBookTable from "@/components/ui/address-book-table";
import SearchBar from "@/components/ui/search-bar";
import UpdateAddressBookForm from "@/components/ui/upadate-address-book-form";
import { usePublicAddress } from "@/hooks/use-public-address";
import { UseTruncateAddress } from "@/hooks/use-truncate-address";
import showToast from "@/utils/show-toast";
import { AddressBookData } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

const AddressBook = () => {
  const [isOpenAddressBookModal, setIsOpenAddressBookModal] = useState(false);
  const [addressBookData, setAddressBookData] = useState<AddressBookData[]>([]);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [editData, setEditData] = useState<AddressBookData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const router = useRouter();
  const publicAddress = usePublicAddress();
  const truncateAddress = UseTruncateAddress();

  useEffect(() => {
    const fetchAddressBookData = async () => {
      try {
        const addressBook = await getAddressBook();

        setAddressBookData(addressBook as AddressBookData[]);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchAddressBookData();
  }, [publicAddress]);

  const openAddressBookModal = () => {
    setIsOpenAddressBookModal(true);
  };

  const closeAddressBook = () => {
    router.push("/");
  };

  const openCloseActions = (actionId: string, data: AddressBookData) => {
    setSelectedActionId((prev) => (prev === actionId ? null : actionId));
    setEditData(data);
  };

  const copyToClipboard = (address: string) => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setCopiedAddress(address);
        showToast({
          message: "Wallet address copied!",
          type: "success",
        });
        setTimeout(() => setCopiedAddress(null), 3000);
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };

  const handleDeleteAddressBookEntry = async (id: string | null) => {
    const updatedAddressBookData = addressBookData.filter(
      (entry) => entry.id !== id
    );
    setAddressBookData(updatedAddressBookData);
  };

  const pushAddressBookDataEntryEndArray = (newItem: AddressBookData) => {
    setAddressBookData((prevData) => [...prevData, newItem]);
  };

  const columns = ["Name", "Address", "Actions"];
  const rows = addressBookData
    .filter((addressBook) => addressBook.publicAddress === publicAddress)
    .map((addressBook) => {
      const actionId = addressBook.id;
      return {
        Name: addressBook.name,
        Address: truncateAddress(addressBook.address),
        Actions: (
          <div
            onClick={() => openCloseActions(actionId, addressBook)}
            className="relative"
          >
            {selectedActionId === actionId ? (
              <>
                <HiDotsVertical size={20} />
                <Actions
                  copyToClipboard={copyToClipboard}
                  address={addressBook.address}
                  openAddressBookModal={openAddressBookModal}
                  selectedAddressBookId={selectedActionId}
                  onDelete={handleDeleteAddressBookEntry}
                  editData={editData}
                  setEditData={setEditData}
                />
              </>
            ) : (
              <HiDotsVertical size={20} />
            )}
          </div>
        ),
      };
    });

  const handleSearch = (targetedName: any) => {
    const lowercaseTarget = targetedName.toLowerCase();

    if (lowercaseTarget.trim() === "") {
      setSearchResult(null);
    } else {
      const searchResult = rows.filter((row) => {
        const rowNameLower = row.Name.toLowerCase();
        let index = 0;

        for (const letter of lowercaseTarget) {
          if (rowNameLower[index] !== letter) {
            return false;
          }

          index++;
        }

        return true;
      });

      if (searchResult.length > 0) {
        setSearchResult(searchResult as any);
      } else {
        setSearchResult([] as any);
      }
    }
  };
  return (
    <div className="h-screen w-screen bg-white">
      {isOpenAddressBookModal ? (
        editData ? (
          <UpdateAddressBookForm
            setIsOpenAddressBookModal={setIsOpenAddressBookModal}
            editData={editData}
            setEditData={setEditData}
            setAddressBookData={setAddressBookData}
            loading={loading}
            setLoading={setLoading}
          />
        ) : (
          <AddressBookForm
            setIsOpenAddressBookModal={setIsOpenAddressBookModal}
            pushAddressBookDataEntryEndArray={pushAddressBookDataEntryEndArray}
            loading={loading}
            setLoading={setLoading}
          />
        )
      ) : (
        ""
      )}

      <div className="flex justify-end p-4 mb-14">
        <button
          onClick={closeAddressBook}
          className="h-10 w-10 border border-gray-200 rounded-full  flex justify-center items-center shadow"
        >
          <RxCross2 size={30} />
        </button>
      </div>
      <div className=" p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-bold text-xl">Address Book</h1>
            <SearchBar handleSearch={handleSearch} />
          </div>
          <button
            className="h-10 w-10 border border-gray-200 rounded-full  flex justify-center items-center shadow mt-8"
            onClick={openAddressBookModal}
          >
            <FiPlus size={30} />
          </button>
        </div>
        <div>
          <hr />
          <AddressBookTable
            columns={columns}
            rows={rows}
            searchResult={searchResult}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressBook;
