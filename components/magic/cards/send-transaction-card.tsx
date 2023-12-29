"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Divider from '@/components/ui/divider';
import { useMagic } from '../../../provider/magic-provider';
import FormButton from '@/components/ui/form-button';
import FormInput from '@/components/ui/form-input';
import ErrorText from '@/components/ui/error-text';
import Card from '@/components/ui/card';
import CardHeader from '@/components/ui/card-header';
import { getFaucetUrl, getNetworkToken } from '@/utils/network';
import showToast from '@/utils/show-toast';
import Spacer from '@/components/ui/spacer';
import TransactionHistory from '@/components/ui/transaction-history';
import Image from 'next/image';


const SendTransaction = () => {
    const { web3 } = useMagic();
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [disabled, setDisabled] = useState(!toAddress || !amount);
    const [hash, setHash] = useState('');
    const [toAddressError, setToAddressError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const publicAddress = localStorage.getItem('user');

    useEffect(() => {
        setDisabled(!toAddress || !amount);
        setAmountError(false);
        setToAddressError(false);
    }, [amount, toAddress]);

    const sendTransaction = useCallback(() => {
        if (!web3?.utils.isAddress(toAddress)) {
            return setToAddressError(true);
        }
        if (isNaN(Number(amount))) {
            return setAmountError(true);
        }
        setDisabled(true);
        const txnParams = {
            from: publicAddress,
            to: toAddress,
            value: web3.utils.toWei(amount, 'ether'),
            gas: 21000,
        };
        web3.eth
            .sendTransaction(txnParams as any)
            .on('transactionHash', (txHash: any) => {
                setHash(txHash);
                console.log('Transaction hash:', txHash);
            })
            .then((receipt: any) => {
                showToast({
                    message: 'Transaction Successful',
                    type: 'success',
                });
                setToAddress('');
                setAmount('');
                console.log('Transaction receipt:', receipt);
            })
            .catch((error: string) => {
                console.error(error);
                setDisabled(false);
            });
    }, [web3, amount, publicAddress, toAddress]);

    return (
        <Card>
            <CardHeader id="send-transaction">Send Transaction</CardHeader>
            {getFaucetUrl() && (
                <div>
                    <a href={getFaucetUrl()} target="_blank" rel="noreferrer">
                        <FormButton onClick={() => null} disabled={false}>
                            Get Test {getNetworkToken()}
                            <Image src="assets/link.svg" alt="link-icon" className="ml-[3px]" height={24} width={24} />
                        </FormButton>
                    </a>
                    <Divider />
                </div>
            )}

            <FormInput
                value={toAddress}
                onChange={(e: any) => setToAddress(e.target.value)}
                placeholder="Receiving Address"
            />
            {toAddressError ? <ErrorText>Invalid address</ErrorText> : null}
            <FormInput
                value={amount}
                onChange={(e: any) => setAmount(e.target.value)}
                placeholder={`Amount (${getNetworkToken()})`}
            />
            {amountError ? <ErrorText className="error">Invalid amount</ErrorText> : null}
            <FormButton onClick={sendTransaction} disabled={!toAddress || !amount || disabled}>
                Send Transaction
            </FormButton>

            {hash ? (
                <>
                    <Spacer size={20} />
                    <TransactionHistory />
                </>
            ) : null}
        </Card>
    );
};

export default SendTransaction;