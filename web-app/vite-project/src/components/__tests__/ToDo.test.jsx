
import { describe, it , beforeAll, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ToDo from '../ToDo.jsx';

// Helper to mock localStorage
const mockLocalStorage = () => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => {
            store[key] = value;
        },
        clear: () => {
            store = {};
        },
    };
};

describe('ToDo Component', () => {
    beforeAll(() => {
        // Mock localStorage
        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage(),
        });
    });

    beforeEach(() => {
        // Clear localStorage between tests
        window.localStorage.clear();
    });

    it('renders without crashing and shows the title', () => {
        render(<ToDo />);
        expect(screen.getByText(/Simple ToDo/i)).toBeInTheDocument();
        expect(screen.getByText('Here is your list')).toBeInTheDocument();
    });

    it('initially shows an empty list', () => {
        render(<ToDo />);
        // By default, no list items other than the input should be present
        const listItems = screen.queryAllByRole('listitem');
        // There's one <li> containing the input field
        expect(listItems).toHaveLength(1);
    });

    it('adds a new item to the list', () => {
        render(<ToDo />);
        const input = screen.getByPlaceholderText(/Enter Text/i);
        const addButton = screen.getByRole('button', { name: /ADD/i });

        fireEvent.change(input, { target: { value: 'Test Item' } });
        fireEvent.click(addButton);

        // The item should appear in the list
        expect(screen.getByText('Test Item')).toBeInTheDocument();
    });

    it('strikes an item when clicked and toggles strike state', () => {
        render(<ToDo />);
        const input = screen.getByPlaceholderText(/Enter Text/i);
        const addButton = screen.getByRole('button', { name: /ADD/i });

        // Add an item
        fireEvent.change(input, { target: { value: 'Strike Item' } });
        fireEvent.click(addButton);

        const listItem = screen.getByText('Strike Item');
        // Click to strike
        fireEvent.click(listItem);
        expect(listItem).toHaveClass('text-decoration-line-through');

        // Click again to un-strike
        fireEvent.click(listItem);
        expect(listItem).not.toHaveClass('text-decoration-line-through');
    });

    it('clears crossed-out items when "CLEAR" is clicked', () => {
        render(<ToDo />);
        const input = screen.getByPlaceholderText(/Enter Text/i);
        const addButton = screen.getByRole('button', { name: /ADD/i });

        // Add two items
        fireEvent.change(input, { target: { value: 'Item 1' } });
        fireEvent.click(addButton);
        fireEvent.change(input, { target: { value: 'Item 2' } });
        fireEvent.click(addButton);

        // Strike one item
        const item1 = screen.getByText('Item 1');
        fireEvent.click(item1);
        expect(item1).toHaveClass('text-decoration-line-through');

        // Click clear
        const clearButton = screen.getByRole('button', { name: /CLEAR/i });
        fireEvent.click(clearButton);

        // The struck item should be removed, the unstruck item remains
        expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('opens the reset modal and closes it on cancel', () => {
        render(<ToDo />);
        const resetButton = screen.getByRole('button', { name: /RESET/i });
        fireEvent.click(resetButton);

        // Modal should appear
        expect(screen.getByText(/Confirm Reset\?/i)).toBeInTheDocument();

        // Cancel the reset
        const cancelButton = screen.getByRole('button', { name: /Cancel/i });
        fireEvent.click(cancelButton);

        // Modal should disappear
        expect(screen.queryByText(/Confirm Reset\?/i)).not.toBeInTheDocument();
    });

    it('resets the list when "Confirm" is clicked in the modal', () => {
        // Pre-populate localStorage with items
        window.localStorage.setItem('List', JSON.stringify(['Item 1', 'Item 2']));
        window.localStorage.setItem('Strike', JSON.stringify([false, true]));

        render(<ToDo />);

        // We expect existing items to load from localStorage
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();

        // Click reset button
        fireEvent.click(screen.getByText(/RESET/i));
        // Confirm in modal
        fireEvent.click(screen.getByText(/Confirm/i));

        // Items should be gone
        expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    });
});
