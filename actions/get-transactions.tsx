import axios, { AxiosResponse } from 'axios';
import { Transaction } from '@/utils/types';
import { API_POLYGON_SCAN } from '@/utils/api-urls';

export const getTransactions = async (
    address: string,
    startblock: 0,
    endblock: 99999999,
    page: 1,
    offset: 10,
    sort: 'asc',
    apiKey: string
): Promise<Transaction> => {
    try {
        const params = {
            module: 'account',
            action: 'txlist',
            address,
            startblock,
            endblock,
            page,
            offset,
            sort,
            apikey: apiKey,
        };

        const response: AxiosResponse<{ result: Transaction }> = await axios.get(API_POLYGON_SCAN, { params });

        return response.data.result;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};
