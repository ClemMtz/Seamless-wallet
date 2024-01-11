import { Transaction } from './types';
import { API_MATIC_TO_DOLLAR } from './api-urls';

export const extractTransactionsData = async (transaction: Transaction) => {
    const { value, from, to, timeStamp } = transaction;

    try {
        const response = await fetch(API_MATIC_TO_DOLLAR);

        if (!response.ok) {
            if (response.status === 500) {
                throw new Error('Internal Server Error when fetching exchange rate');
            } else {
                throw new Error(`Failed to fetch exchange rate. Status: ${response.status}`);
            }
        }

        const exchangeRateData = await response.json();
        const exchangeRate = exchangeRateData.USD;

        if (!exchangeRate) {
            throw new Error('Invalid exchange rate data received');
        }

        const valueInUSD = value * exchangeRate;


        // convert timeStamp into human readable time
        const convertTimestamp = (timestamp: any) => {
            let d = new Date(timestamp * 1000);
            let yyyy = d.getFullYear();
            let mm = ('0' + (d.getMonth() + 1)).slice(-2);
            let dd = ('0' + d.getDate()).slice(-2);

            const time = yyyy + '-' + mm + '-' + dd;
            return time;
        }

        const timestamp = convertTimestamp(timeStamp);


        return { valueInUSD, from, to, timestamp };
    } catch (error) {
        console.error('Error during transaction data extraction:', error);
        return null;
    }
};

