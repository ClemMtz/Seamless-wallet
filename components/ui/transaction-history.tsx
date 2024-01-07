"use client";

import React from 'react';
import { useEffect } from 'react';
import { getTransactions } from '@/actions/get-transactions';
import { extractTransactionsData } from '@/utils/extract-transactions-data';
import { getBlockExplorer } from '@/utils/network';

const TransactionHistory = () => {
    const publicAddress = localStorage.getItem('user');

    useEffect(() => {
        const fetchData = async () => {
            const apiKey = process.env.API_TOKEN_POLYGON;
            const address = publicAddress;

            const transactions = await getTransactions(address as string, 0, 99999999, 1, 10, 'asc', apiKey as string);
            const extarctedData = transactions.map(extractTransactionsData);
            console.log('Transactions:', extarctedData);
        };

        fetchData();
    }, []);

    return (
        <a className="action-button" href={getBlockExplorer(publicAddress as string)} target="_blank" rel="noreferrer">
            <div className="flex items-center justify-center border border-[#296982] w-44 h-10 rounded-lg">
                Transaction History
            </div>
        </a>
    );
};

export default TransactionHistory;