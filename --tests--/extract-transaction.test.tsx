import { extractTransactionsData } from "@/utils/extract-transactions-data";
import { Transaction } from '../utils/types';


jest.mock('node-fetch');

describe('extractTransactionsData', () => {
    it('extracts transaction data correctly from API call', async () => {

        const mockedExchangeRateData = { USD: 1.25 };
        const mockedApiResponse = {
            ok: true,
            json: async () => mockedExchangeRateData,
        };

        (global as any).fetch = jest.fn().mockResolvedValueOnce(mockedApiResponse);

        const sampleTransaction: Transaction = {
            value: 100,
            from: 'MATIC',
            to: 'USD',
            timeStamp: "NaN-aN-aN"

        };

        const result = await extractTransactionsData(sampleTransaction);

        expect(fetch).toHaveBeenCalledWith('https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=USD');

        expect(result).toEqual({
            valueInUSD: 125, // 100 * 1.25
            from: 'MATIC',
            to: 'USD',
            timestamp: "NaN-aN-aN"
        });
    });

    it('handles API error', async () => {

        const mockedApiResponse = {
            ok: false,
            status: 500,
        };

        (global as any).fetch = jest.fn().mockResolvedValueOnce(mockedApiResponse);

        const sampleTransaction: Transaction = {
            value: 100,
            from: 'MATIC',
            to: 'USD',
            timeStamp: "NaN-aN-aN"
        };

        const result = await extractTransactionsData(sampleTransaction);
        expect(fetch).toHaveBeenCalledWith('https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=USD');
        expect(result).toBeNull();
    });
});
