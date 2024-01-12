import { Dispatch, SetStateAction } from 'react'

export type LoginProps = {
    token: string
    setToken: Dispatch<SetStateAction<string>>
}

export type { Magic } from '@/provider/magic-provider'

export interface Transaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    from: string;
    to: string;
    value: number;
    gas: string;
    gasPrice: string;
    isError: string;
    txreceipt_status: string;
    input: string;
}

export interface ApiParams {
    module: string;
    action: string;
    address: string;
    startblock: number;
    endblock: number;
    page: number;
    offset: number;
    sort: string;
    apikey: string;
}

export type ExtractedData = {
    valueInUSD: number;
    from: string;
    to: string;
    timestamp: string;
}

export type TransactionHistoryTypes = {
    balance: string;
    truncateAdress: (params: string) => string;
    publicAdress: string | null;
}

export type TransactionTableProps = {
    columns: string[];
    rows: { [key: string]: string | number | string[] }[];
}

export type ButtonTypes = {
    sendToken: () => void;
    showAdress: () => void;
}

