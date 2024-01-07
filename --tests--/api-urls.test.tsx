import axios from 'axios';
import { API_MATIC_TO_DOLLAR } from '@/utils/api-urls';
import { API_POLYGON_SCAN } from '@/utils/api-urls';

describe('API URL MATIC TO DOLLAR', () => {
    it('fetches data from the API', async () => {
        jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { someKey: 'someValue' } });

        const response = await axios.get(API_MATIC_TO_DOLLAR);

        expect(axios.get).toHaveBeenCalledWith(API_MATIC_TO_DOLLAR);

        expect(response.data).toEqual({ someKey: 'someValue' });

        jest.clearAllMocks();
    });
});

describe('API URL MATIC TO DOLLAR', () => {
    it('fetches data from the API', async () => {
        jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { someKey: 'someValue' } });

        const response = await axios.get(API_POLYGON_SCAN);

        expect(axios.get).toHaveBeenCalledWith(API_POLYGON_SCAN);

        expect(response.data).toEqual({ someKey: 'someValue' });

        jest.clearAllMocks();
    });
});
