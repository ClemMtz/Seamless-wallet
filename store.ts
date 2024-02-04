import { create } from "zustand";
import { StoreTypes } from "./utils/types";

const useStore = create<StoreTypes>((set) => ({
  token: localStorage.getItem("token") || "",
  setToken: (newToken: string) => set({ token: newToken }),

  publicAddress: localStorage.getItem("user") || "",

  balance: "",
  setBalance: (balance) => set({ balance }),

  isOpenAddressBookModal: false,
  setIsOpenAddressBookModal: (isOpen) =>
    set({ isOpenAddressBookModal: isOpen }),

  truncateAddress: (address: string) => {
    if (!address) {
      return "";
    }
    const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-6)}`;
    return truncatedAddress;
  },

  openAddressBookModal: () => set({ isOpenAddressBookModal: true }),
}));

export default useStore;
