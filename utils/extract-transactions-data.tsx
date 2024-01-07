import { Transaction } from './types';
import { API_MATIC_TO_DOLLAR } from './api-urls';

export const extractTransactionsData = async (transaction: Transaction) => {
    const { value, from, to, hash } = transaction;

    try {
        const response = await fetch(API_MATIC_TO_DOLLAR);

        if (!response.ok) {
            throw new Error(`Failed to fetch exchange rate. Status: ${response.status}`);
        }

        const exchangeRateData = await response.json();
        const exchangeRate = exchangeRateData.USD;

        if (!exchangeRate) {
            throw new Error('Invalid exchange rate data received');
        }

        const valueInUSD = value * exchangeRate;

        return { valueInUSD, from, to, hash };
    } catch (error) {
        console.error('Error during transaction data extraction:', error);
        return null;
    }
};

