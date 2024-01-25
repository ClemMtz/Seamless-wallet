import { UpdateAddressBookFormProps } from "@/utils/types";

import { RxCross2 } from "react-icons/rx";

import { UsePublicAddress } from "@/hooks/use-public-address";
import showToast from "@/utils/show-toast";
import axios from "axios";
import { useEffect, useState } from "react";

const UpdateAddressBookForm = ({
  setIsOpenAddressBookModal,
  editData,
  setEditData,
  selectedAddressBookId,
}: UpdateAddressBookFormProps) => {
  const publicAddress = UsePublicAddress();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    publicAddress: publicAddress,
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name,
        address: editData.address,
        publicAddress: publicAddress,
      });
    }
  }, [editData, publicAddress]);

  const { name, address } = formData;

  const closeAddressBookModal = () => {
    setIsOpenAddressBookModal(false);
    setEditData(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/addressBook/${selectedAddressBookId}`);

      showToast({
        message: "AddressBook successfully updated!",
        type: "success",
      });

      closeAddressBookModal();
    } catch (error) {
      showToast({
        message: "Something went wrong. Please try again",
        type: "error",
      });
    }
  };

  return (
    <div className=" absolute flex justify-center items-center h-screen w-screen bg-[#00000086] z-40">
      <div className="h-[30rem] w-[20rem] bg-white flex flex-col p-4 rounded-lg">
        <div className="flex justify-end">
          <button
            onClick={closeAddressBookModal}
            className="h-10 w-10 border border-gray-200 rounded-full  flex justify-center items-center shadow mb-14"
          >
            <RxCross2 size={30} />
          </button>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 justify-center"
        >
          <label htmlFor="name" className="mb-[-0.5rem]">
            Name:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={handleChange}
            className="border border-gray-400 rounded-lg h-7 pl-2"
          />

          <label htmlFor="address" className="mb-[-0.5rem]">
            Wallet address:
          </label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={handleChange}
            className="border border-gray-400 rounded-lg h-7 mb-20 pl-2"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-[#3b92b4] text-xl h-10 w-24 border border-gray-200 rounded-2xl shadow-md disabled:opacity-50"
              disabled={name && address ? false : true}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddressBookForm;
