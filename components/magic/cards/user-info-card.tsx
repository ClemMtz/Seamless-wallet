"use client";

import { useCallback, useEffect, useState } from 'react';
import Divider from '@/components/ui/divider';
import { LoginProps } from '@/utils/types';
import { logout } from '@/utils/common';
import { useMagic } from '../../../provider/magic-provider';
import Card from '@/components/ui/card';
import CardHeader from '@/components/ui/card-header';
import CardLabel from '@/components/ui/card-label';
import Spinner from '@/components/ui/spinner';
import { getNetworkToken } from '@/utils/network';

const UserInfo = ({ token, setToken }: LoginProps) => {
    const { magic, web3 } = useMagic();

    const [balance, setBalance] = useState('...');
    const [copied, setCopied] = useState('Copy');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [publicAddress, setPublicAddress] = useState(localStorage.getItem('user'));

    useEffect(() => {
        if (magic) {
            magic.wallet.showAddress()
        }
        const checkLoginandGetBalance = async () => {
            const isLoggedIn = await magic?.user.isLoggedIn();
            if (isLoggedIn) {
                try {
                    const metadata = await magic?.user.getInfo();
                    if (metadata) {
                        localStorage.setItem('user', metadata?.publicAddress!);
                        setPublicAddress(metadata?.publicAddress!);
                    }
                } catch (e) {
                    console.log('error in fetching address: ' + e);
                }
            }
        };
        setTimeout(() => checkLoginandGetBalance(), 5000);
    }, []);

    const getBalance = useCallback(async () => {
        if (publicAddress && web3) {
            const balance = await web3.eth.getBalance(publicAddress);
            if (balance == BigInt(0)) {
                setBalance('0');
            } else {
                setBalance(web3.utils.fromWei(balance, 'ether'));
            }
            console.log('BALANCE: ', balance);
        }
    }, [web3, publicAddress]);

    const refresh = useCallback(async () => {
        setIsRefreshing(true);
        await getBalance();
        setTimeout(() => {
            setIsRefreshing(false);
        }, 500);
    }, [getBalance]);

    useEffect(() => {
        if (web3) {
            refresh();
        }
    }, [web3, refresh]);

    useEffect(() => {
        setBalance('...');
    }, [magic]);

    const disconnect = useCallback(async () => {
        if (magic) {
            await logout(setToken, magic);
        }
    }, [magic, setToken]);

    const copy = useCallback(() => {
        if (publicAddress && copied === 'Copy') {
            setCopied('Copied!');
            navigator.clipboard.writeText(publicAddress);
            setTimeout(() => {
                setCopied('Copy');
            }, 1000);
        }
    }, [copied, publicAddress]);

    return (
        <>
            <div className='flex flex-row'>
                <button onClick={disconnect}>Disconnect</button>
            </div>
            <Card>
                <Divider />
                <CardLabel leftHeader="Address" rightAction={!publicAddress ? <Spinner /> : <div onClick={copy}>{copied}</div>} />
                <div className="code">{publicAddress?.length == 0 ? 'Fetching address..' : publicAddress}</div>
                <Divider />
                <CardLabel
                    leftHeader="Balance"
                    rightAction={
                        isRefreshing ? (
                            <div className="loading-container">
                                <Spinner />
                            </div>
                        ) : (
                            <div onClick={refresh}>Refresh</div>
                        )
                    }
                />
                <div className="code">
                    {balance.substring(0, 7)} {getNetworkToken()}
                </div>
            </Card>
        </>
    );
};

export default UserInfo;