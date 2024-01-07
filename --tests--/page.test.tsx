import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Dashboard from '@/components/dashboard';
import { describe } from 'node:test';

describe("Home", () => {
    it('renders a button', () => {
        render(<Dashboard />)
        const button = screen.getByRole("button", { level: 1 })
        expect(button).toBeInTheDocument()
    })
})