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

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string;
}

export type ExtractedData = {
    valueInUSD: number;
    from: string;
    to: string;
    hash: string;
}

export type TransactionHistoryTypes = {
    balance: string;
}