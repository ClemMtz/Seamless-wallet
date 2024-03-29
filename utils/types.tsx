import { Dispatch, SetStateAction } from "react";

export type { Magic } from "@/provider/magic-provider";

export type Transaction = {
  // map: any;
  // address: string;
  // startblock: number;
  // endblock: number;
  // page: number;
  // offset: number;
  // sort: string;
  // apiKey: string;
  value: number;
  from: string;
  to: string;
  timeStamp: string;
};

export type UsdcData = {
  module: string;
  action: string;
  contractaddress: string;
  address: string | null;
  page: number;
  offset: number;
  sort: string;
  apikey: string | undefined;
};

export type ExtractedData = {
  // valueInUSD?: number;
  value: number;
  from: string;
  to: string;
  date: string;
};

export type TransactionTableProps = {
  columns: string[];
  rows: { [key: string]: string | number | string[] | JSX.Element }[];
};

export type AddressBookFormProps = {
  pushAddressBookDataEntryEndArray: (newItem: AddressBookData) => void;
};

export type ButtonTypes = {
  sendToken: () => void;
  showAddress: () => void;
};

export type UpdateAddressBookFormProps = {
  setAddressBookData: Dispatch<SetStateAction<AddressBookData[]>>;
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

export type StoreTypes = {
  token: string;
  setToken: any;
  truncateAddress: (address: string) => string;
  balance: string;
  setBalance: (balance: string) => void;
  isUnmounted: boolean;
  setIsUnmounted: (isUnmounted: boolean) => void;
  isModalUnmounted: boolean;
  setIsModalUnmounted: (isUnmounted: boolean) => void;
  isOpenAddressBookModal: boolean;
  setIsOpenAddressBookModal: (isOpen: boolean) => void;
  loading: boolean;
  setLoading: (isLoaded: boolean) => void;
  dataLoading: boolean;
  setDataLoading: (dataLoading: boolean) => void;
  editData: AddressBookData | null;
  setEditData: Dispatch<SetStateAction<AddressBookData | null>>;
  copiedAddress: string | null;
  setCopiedAddress: (address: string | null) => void;
  searchResult: null;
  setSearchResult: (result: any[] | null) => void;
};

export type ActionTypes = {
  copyToClipboard: (address: string) => void;
  address: string;
  openAddressBookModal: any;
  selectedAddressBookId: string;
  onDelete: (id: string | null) => Promise<void>;
};
