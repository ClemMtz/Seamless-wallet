

import React from 'react';
import Image from 'next/image';
import { getBlockExplorer } from '@/utils/network';

const TransactionHistory = () => {
    const publicAddress = localStorage.getItem('user');

    return (
        <a className="action-button" href={getBlockExplorer(publicAddress as string)} target="_blank" rel="noreferrer">
            <div className="flex items-center justify-center">
                Transaction History <Image src="assets/link.svg" alt="link-icon" className="ml-[3px]" />
            </div>
        </a>
    );
};

export default TransactionHistory;