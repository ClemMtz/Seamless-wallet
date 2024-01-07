"use client";

import React, { useState } from 'react';
import { useEffect } from 'react';
import { getTransactions } from '@/actions/get-transactions';
import { extractTransactionsData } from '@/utils/extract-transactions-data';
import { getBlockExplorer } from '@/utils/network';
import { ExtractedData, TransactionHistoryTypes } from '@/utils/types';
import TransactionTable from './table';


const TransactionHistory = ({ balance }: TransactionHistoryTypes) => {
    const publicAddress = localStorage.getItem('user');
    const [transactionData, setTransactionData] = useState<ExtractedData[]>([]);
    console.log(transactionData)

    useEffect(() => {
        const fetchTransactionsData = async () => {
            try {
                const apiKey = process.env.API_TOKEN_POLYGON;
                const address = publicAddress;

                const transactions = await getTransactions(address as string, 0, 99999999, 1, 10, 'asc', apiKey as string);
                const extractedData = transactions.map(extractTransactionsData);
                console.log('Transactions:', extractedData);
                setTransactionData(extractedData as any);
            } catch (error) {
                console.error('Error fetching transactions:', error);

            }
        };

        fetchTransactionsData();

    }, [balance]);

    return (
        <div>
            <a className="action-button" href={getBlockExplorer(publicAddress as string)} target="_blank" rel="noreferrer">
                <div className="flex items-center justify-center border border-[#296982] w-44 h-10 rounded-lg">
                    Transaction History
                </div>
            </a>
            {/* <TransactionTable columns={} rows={}/> */}
            <ul>
                {transactionData.map((transaction: any) => (
                    <li key={transaction.hash}>
                        <strong>From:</strong> {transaction.from}<br />
                        <strong>To:</strong> {transaction.to}<br />
                        <strong>Amount:</strong> $ {transaction.valueInUSD}<br />
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistory;