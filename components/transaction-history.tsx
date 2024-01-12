"use client";

import React, { useState } from 'react';
import { useEffect } from 'react';
import { getTransactions } from '@/actions/get-transactions';
import { extractTransactionsData } from '@/utils/extract-transactions-data';
import { ExtractedData, TransactionHistoryTypes } from '@/utils/types';
import TransactionTable from './ui/transactions-table';


const TransactionHistory = ({ balance, truncateAdress, publicAdress }: TransactionHistoryTypes) => {
    const [transactionData, setTransactionData] = useState<ExtractedData[]>([]);

    useEffect(() => {
        const fetchTransactionsData = async () => {
            try {
                const apiKey = process.env.API_TOKEN_POLYGON;
                const address = publicAdress;

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

    }, [balance, publicAdress]);


    const columns = ['From', 'To', 'Amount'];
    const rows = transactionData.map((transaction) => ({
        From: truncateAdress(transaction.from),
        Date: transaction.timestamp,
        To: truncateAdress(transaction.to),
        Amount: `$ ${Number(transaction.valueInUSD / 1e18).toFixed(3)}`,
    }));

    return (
        <div>
            <hr />
            <TransactionTable columns={columns} rows={rows} />
        </div>
    );
};

export default TransactionHistory;