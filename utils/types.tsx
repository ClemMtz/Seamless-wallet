import { Dispatch, SetStateAction } from "react";

export type LoginProps = {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

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

export type TransactionHistoryTypes = {
  balance: string;
  truncateAddress: (params: string) => string;
  publicAddress: string | null;
};

export type TransactionTableProps = {
  columns: string[];
  rows: { [key: string]: string | number | string[] | JSX.Element }[];
};

export type ButtonTypes = {
  sendToken: () => void;
  showAddress: () => void;
  balance: string;
};

export type AddressBookFormProps = {
  setIsOpenAddressBookModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UpdateAddressBookFormProps = {
  setIsOpenAddressBookModal: React.Dispatch<React.SetStateAction<boolean>>;
  editData: AddressBookData | null;
  setEditData: Dispatch<SetStateAction<AddressBookData | null>>;
  selectedAddressBookId: string | null;
};

export type AddressBookData = {
  id: string;
  name: string;
  address: string;
  publicAddress: string;
  createdAt: string;
  updatedAt: string;
};
