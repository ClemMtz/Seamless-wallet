import '@testing-library/jest-dom';
import axios from 'axios';

import { getTransactions } from '@/actions/get-transactions'; // Update the import path accordingly

// Mocking axios
jest.mock('axios');

describe('getTransactions Function', () => {
    it('should fetch transactions successfully', async () => {
        // Mocking the Axios response
        const mockApiResponse = {
            data: {
                result: [
                    // Your mock transaction data here
                ],
            },
        };

        axios.get.mockResolvedValueOnce(mockApiResponse);

        // Call the getTransactions function with mock data
        const apiKey = 'yourApiKey';
        const transactions = await getTransactions('mockedAddress', 0, 99999999, 1, 10, 'asc', apiKey);

        // Assertions
        expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
            params: {
                module: 'account',
                action: 'txlist',
                address: 'mockedAddress',
                startblock: 0,
                endblock: 99999999,
                page: 1,
                offset: 10,
                sort: 'asc',
                apikey: apiKey,
            },
        });
        expect(transactions).toEqual(mockApiResponse.data.result);

        // Other assertions or interactions if needed
    });

    it('should handle errors when fetching transactions', async () => {
        // Mocking the Axios error
        const mockError = new Error('Mocked error message');
        axios.get.mockRejectedValueOnce(mockError);

        // Assertions
        await expect(getTransactions('mockedAddress', 0, 99999999, 1, 10, 'asc', 'yourApiKey')).rejects.toThrowError(
            'Mocked error message'
        );

        // Other assertions or interactions if needed
    });
});



