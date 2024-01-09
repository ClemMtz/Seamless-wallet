"use client";

import React, { useState } from 'react';
import { useEffect } from 'react';
import { getTransactions } from '@/actions/get-transactions';
import { extractTransactionsData } from '@/utils/extract-transactions-data';
import { getBlockExplorer } from '@/utils/network';
import { ExtractedData, TransactionHistoryTypes } from '@/utils/types';
import TransactionTable from './ui/transactions-table';


const TransactionHistory = ({ balance, truncateAdress }: TransactionHistoryTypes) => {
    const publicAddress = localStorage.getItem('user');
    const [transactionData, setTransactionData] = useState<ExtractedData[]>([]);

    useEffect(() => {
        const fetchTransactionsData = async () => {
            try {
                const apiKey = process.env.API_TOKEN_POLYGON;
                const address = publicAddress;

                const transactions = await getTransactions(address as string, 0, 99999999, 1, 10, 'asc', apiKey as string) || [];

                const extractedDataPromises = transactions.map(async (transaction) => {
                    const extracted = await extractTransactionsData(transaction);
                    return extracted;
                });

                const extractedData = await Promise.all(extractedDataPromises);

                setTransactionData(extractedData as ExtractedData[]);
            } catch (error) {
                console.error('Error fetching transactions:', error);

            }
        };

        fetchTransactionsData();

    }, [balance, publicAddress]);


    const columns = ['From', 'To', 'Amount'];
    const rows = transactionData.map(transaction => ({
        From: truncateAdress(transaction.from),
        To: truncateAdress(transaction.to),
        Amount: `$ ${Number(transaction.valueInUSD / 1e18).toFixed(3)}`,
    }));

    return (
        <div>
            {/* <a className="action-button" href={getBlockExplorer(publicAddress as string)} target="_blank" rel="noreferrer">
                <div className="flex items-center justify-center border border-[#296982] w-44 h-10 rounded-lg">
                    Transaction History
                </div>
            </a> */}
            <hr />
            <TransactionTable columns={columns} rows={rows} />
        </div>
    );
};

export default TransactionHistory;