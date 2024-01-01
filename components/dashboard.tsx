

import React from 'react';
import WalletMethods from './magic/cards/wallet-methods-card';
import SendTransaction from './magic/cards/send-transaction-card';
import Spacer from '@/components/ui/spacer';
import { LoginProps } from '@/utils/types';
import UserInfo from './magic/cards/user-info-card';
import PatternComponent from './pattern/pattern-component';


export default function Dashboard({ token, setToken }: LoginProps) {
    return (
        <div className="home-page">
            <PatternComponent />
            <div className="cards-container">
                <UserInfo token={token} setToken={setToken} />
                <Spacer size={10} />
                <SendTransaction />
                <Spacer size={10} />
                <WalletMethods token={token} setToken={setToken} />
            </div>
        </div>
    );
}