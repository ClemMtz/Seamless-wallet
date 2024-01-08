import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock-jest';
import '@testing-library/jest-dom';
import TransactionHistory from '@/components/transaction-history';

beforeEach(() => {
    fetchMock.reset();
});

test('renders transaction data after fetching', async () => {

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce('sampleUserAddress');

    fetchMock.mock('https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=USD', [
        { value: 100, from: 'MATIC', to: 'USD' },
        { value: 200, from: 'ETH', to: 'USD' },
    ]);

    render(<TransactionHistory balance={"1000"} />);

    await waitFor(() => screen.getByText('From'));

    expect(screen.getByText('MATIC...USD')).toBeInTheDocument();
    expect(screen.getByText('ETH...USD')).toBeInTheDocument();
});

test('handles error during data fetching', async () => {

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValueOnce('sampleUserAddress');

    fetchMock.mock('https://api-testnet.polygonscan.com/api', 500);

    render(<TransactionHistory balance={"1000"} />);

    await waitFor(() => screen.getByText('Error fetching transactions'));

    expect(screen.getByText('Error fetching transactions:')).toBeInTheDocument();
});

