import { Dispatch, SetStateAction } from 'react'

export type LoginProps = {
    token: string
    setToken: Dispatch<SetStateAction<string>>
}

export type { Magic } from '@/provider/magic-provider'

export type Transaction = {
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



export type ExtractedData = {
    valueInUSD: number;
    from: string;
    to: string;
    timestamp: string;
}

export type TransactionHistoryTypes = {
    balance: string;
    truncateAddress: (params: string) => string;
    publicAddress: string | null;
}

export type TransactionTableProps = {
    columns: string[];
    rows: { [key: string]: string | number | string[] }[];
}

export type ButtonTypes = {
    sendToken: () => void;
    showAddress: () => void;
}

