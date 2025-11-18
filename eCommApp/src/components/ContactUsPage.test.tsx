import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ContactUsPage from './ContactUsPage';

// Mock components
vi.mock('./Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

describe('ContactUsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the contact form with all fields', () => {
        render(<ContactUsPage />);
        
        expect(screen.getByText('Contact Us')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Request')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    it('updates form fields when user types', () => {
        render(<ContactUsPage />);
        
        const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const requestInput = screen.getByLabelText('Request') as HTMLTextAreaElement;

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(requestInput, { target: { value: 'Test request' } });

        expect(nameInput.value).toBe('John Doe');
        expect(emailInput.value).toBe('john@example.com');
        expect(requestInput.value).toBe('Test request');
    });

    it('displays modal with thank you message after form submission', () => {
        render(<ContactUsPage />);
        
        const nameInput = screen.getByLabelText('Name');
        const emailInput = screen.getByLabelText('Email');
        const requestInput = screen.getByLabelText('Request');
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(requestInput, { target: { value: 'Test request' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Thank you for your message.')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
    });

    it('clears form fields after clicking Continue button', () => {
        render(<ContactUsPage />);
        
        const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const requestInput = screen.getByLabelText('Request') as HTMLTextAreaElement;
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        // Fill and submit form
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(requestInput, { target: { value: 'Test request' } });
        fireEvent.click(submitButton);

        // Click Continue button
        const continueButton = screen.getByRole('button', { name: 'Continue' });
        fireEvent.click(continueButton);

        // Check that form fields are cleared
        expect(nameInput.value).toBe('');
        expect(emailInput.value).toBe('');
        expect(requestInput.value).toBe('');
        
        // Check that modal is closed
        expect(screen.queryByText('Thank you for your message.')).not.toBeInTheDocument();
    });
});
