import { Dispatch, SetStateAction } from "react";

export type { Magic } from "@/provider/magic-provider";

export type Transaction = {
  map: any;
  address: string;
  startblock: number;
  endblock: number;
  page: number;
  offset: number;
  sort: string;
  apiKey: string;
  value: number;
  from: string;
  to: string;
  timeStamp: string;
};

export type ExtractedData = {
  valueInUSD: number;
  from: string;
  to: string;
  timestamp: string;
};

export type TransactionTableProps = {
  columns: string[];
  rows: { [key: string]: string | number | string[] | JSX.Element }[];
};

export type ButtonTypes = {
  sendToken: () => void;
  showAddress: () => void;
};

export type AddressBookFormProps = {
  setIsOpenAddressBookModal: React.Dispatch<React.SetStateAction<boolean>>;
  pushAddressBookDataEntryEndArray: (newItem: AddressBookData) => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export type UpdateAddressBookFormProps = {
  setIsOpenAddressBookModal: React.Dispatch<React.SetStateAction<boolean>>;
  editData: AddressBookData | null;
  setEditData: Dispatch<SetStateAction<AddressBookData | null>>;
  setAddressBookData: Dispatch<SetStateAction<AddressBookData[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export type AddressBookData = {
  id: string;
  name: string;
  address: string;
  publicAddress: string;
  createdAt: string;
  updatedAt: string;
};

export type SearchBarProps = {
  handleSearch: (targetName: any) => void;
};

export type AddressBookTableProps = {
  searchResult: null;
};

export type StoreTypes = {
  token: string;
  setToken: any;
  truncateAddress: (address: string) => string;
  balance: string;
  setBalance: (balance: string) => void;
  isOpenAddressBookModal: boolean;
  setIsOpenAddressBookModal: (isOpen: boolean) => void;
  openAddressBookModal: (editData?: any) => void;
};
