import useStore from "@/store";
import showToast from "@/utils/show-toast";
import { ActionTypes } from "@/utils/types";
import axios from "axios";
import { motion } from "framer-motion";
import { FaRegCopy } from "react-icons/fa";
import { GrDocumentUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

const Actions = ({
  copyToClipboard,
  address,
  openAddressBookModal,
  selectedAddressBookId,
  onDelete,
}: ActionTypes) => {
  const { editData, setEditData, setIsModalUnmounted } = useStore();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/addressBook/${selectedAddressBookId}`);
      showToast({
        message: "AddressBook successfully deleted!",
        type: "success",
      });
      if (onDelete) {
        onDelete(selectedAddressBookId);
      }
      setEditData(null);
    } catch (error) {
      showToast({
        message: "Something went wrong. Please try again",
        type: "error",
      });
    }
  };

  const handleUpdate = () => {
    openAddressBookModal(editData);
    setIsModalUnmounted(false);
  };

  return (
    <motion.div
      className="h-40 w-20 bg-white border border-gray-200 rounded-lg absolute top-0 right-10 z-20"
      initial={{ opacity: 0, translateX: 50 }}
      animate={{ opacity: 1, translateX: 0 }}
    >
      <button
        className="flex flex-row justify-center items-center h-10 gap-1 pl-1 mt-2"
        onClick={() => copyToClipboard(address)}
      >
        <div>
          <FaRegCopy size={20} />
        </div>
        <p>Copy</p>
      </button>
      <hr />
      <button
        className="flex flex-row justify-center items-center h-10 gap-1 pl-1 mt-2 mb-2"
        onClick={handleUpdate}
      >
        <div>
          <GrDocumentUpdate size={20} />
        </div>
        <p>Update</p>
      </button>
      <hr />
      <button
        className="flex flex-row justify-center items-center h-10 gap-1 pl-1 mt-1"
        onClick={handleDelete}
      >
        <div>
          <RiDeleteBin6Line size={20} />
        </div>
        <p>delete</p>
      </button>
    </motion.div>
  );
};

export default Actions;
