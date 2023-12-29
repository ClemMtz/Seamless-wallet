import React from 'react';
import WalletMethods from './cards/wallet-methods-card';
import SendTransaction from './cards/send-transaction-card';
import Spacer from '@/components/ui/spacer';
import { LoginProps } from '@/utils/types';
import UserInfo from './cards/user-info-card';
import DevLinks from './dev-links';
import Header from './header';

export default function Dashboard({ token, setToken }: LoginProps) {
    return (
        <div className="home-page">
            <Header />
            <div className="cards-container">
                <UserInfo token={token} setToken={setToken} />
                <Spacer size={10} />
                <SendTransaction />
                <Spacer size={10} />
                <WalletMethods token={token} setToken={setToken} />
                <Spacer size={15} />
            </div>
            <DevLinks primary />
        </div>
    );
}