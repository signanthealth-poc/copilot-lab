import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
    it('displays the copyright year 2026', () => {
        render(<Footer />);
        
        expect(screen.getByText(/© 2026 The Daily Harvest. All rights reserved./i)).toBeInTheDocument();
    });
});
