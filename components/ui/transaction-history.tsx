

import React from 'react';
import { getBlockExplorer } from '@/utils/network';

const TransactionHistory = () => {
    const publicAddress = localStorage.getItem('user');

    return (
        <a className="action-button" href={getBlockExplorer(publicAddress as string)} target="_blank" rel="noreferrer">
            <div className="flex items-center justify-center border border-[#296982] w-44 h-10 rounded-lg">
                Transaction History
            </div>
        </a>
    );
};

export default TransactionHistory;