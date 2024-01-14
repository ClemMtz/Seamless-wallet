"use client"

import React, { useCallback, useState } from 'react';
import ErrorText from '@/components/ui/error-text';
import { useMagic } from '../provider/magic-provider';
import Spinner from '@/components/ui/spinner';
import FormInput from '@/components/ui/form-input';
import showToast from '@/utils/show-toast';
import { RPCError } from 'magic-sdk';

const UpdateEmail = () => {
    const { magic } = useMagic();
    const [disabled, setDisabled] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);

    const updateEmail = useCallback(async () => {
        if (!magic) return;
        try {
            if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                setEmailError(true);
                setDisabled(false);
            } else {
                setDisabled(true);
                await magic.auth.updateEmailWithUI({ email, showUI: true });
                showToast({ message: 'Email Updated!', type: 'success' });
                setDisabled(false);
                setEmail('');
            }
        } catch (error) {
            setDisabled(false);
            console.error(error);
            if (error instanceof RPCError) {
                showToast({ message: error.message, type: 'error' });
            } else {
                showToast({ message: 'Update email failed', type: 'error' });
            }
        }
    }, [magic, email]);

    const handleEmailChange = (e: any) => {
        setEmailError(false);
        setEmail(e.target.value);
    };

    return (
        <div className="text-right h-32 pt-2">
            <div className='mb-4'>
                {
                    emailError ? (
                        <div className='h-0'>
                            <ErrorText>Enter a valid email</ErrorText>
                        </div>
                    ) : null}
            </div>
            <FormInput value={email} onChange={handleEmailChange} placeholder="New Email" />
            <button className="text-[#3b92b4] text-lg" onClick={updateEmail} disabled={disabled}>
                {disabled ? (
                    <div className="loading-container w-[76px] flex">
                        <Spinner />
                    </div>
                ) : (
                    'Update'
                )
                }
            </button >
        </div >
    );
};

export default UpdateEmail;