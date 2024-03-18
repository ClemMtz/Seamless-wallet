import { create } from "zustand";
import { StoreTypes } from "./utils/types";

const useStore = create<StoreTypes>((set) => ({
  token:
    typeof window === "undefined" ? "" : localStorage.getItem("token") || "",
  setToken: (newToken: string) => set({ token: newToken }),

  balance: "",
  setBalance: (balance) => set({ balance }),

  isUnmounted: false,
  setIsUnmounted: (isUnmounted) => set({ isUnmounted }),

  dataLoading: false,
  setDataLoading: (dataLoading) => set({ dataLoading }),

  isModalUnmounted: false,
  setIsModalUnmounted: (isModalUnmounted) => set({ isModalUnmounted }),

  isOpenAddressBookModal: false,
  setIsOpenAddressBookModal: (isOpen) =>
    set({ isOpenAddressBookModal: isOpen }),

  loading: false,
  setLoading: (isLoaded) => set({ loading: isLoaded }),

  copiedAddress: null,
  setCopiedAddress: (address: any) => set({ copiedAddress: address }),

  editData: null,
  setEditData: (data: any) => set({ editData: data }),

  searchResult: null,
  setSearchResult: (result: any) => set({ searchResult: result }),

  truncateAddress: (address: string) => {
    if (!address) {
      return "";
    }
    const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-6)}`;
    return truncatedAddress;
  },
}));

export default useStore;
