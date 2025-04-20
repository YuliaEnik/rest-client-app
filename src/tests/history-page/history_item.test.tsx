import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { HistoryItem } from '@/components';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('HistoryItem Component', () => {
  const mockRequest = {
    executedAt: 1744924534290,
    restfulUrl: '/be/GET/aHR0cHM6Ly9hcGkucG90dGVyZGIuY29tL3YxL2NoYXJhY3RlcnM=?',
    apiUrl: 'https://api.potterdb.com/v1/characters',
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders HistoryItem correctly', () => {
    render(<HistoryItem request={mockRequest} />);

    const dateText = screen.getByText(/Apr 18 2025/);
    expect(dateText.textContent).toMatch(/12:15:34 AM|00:15:34/);
    expect(screen.getByText('GET')).toBeTruthy();
    expect(
      screen.getByText('https://api.potterdb.com/v1/characters')
    ).toBeTruthy();
  });

  test('navigates to the correct URL when clicked', () => {
    render(<HistoryItem request={mockRequest} />);
    waitFor(() => {
      fireEvent.click(screen.getByTestId('link-button'));
      expect(mockPush).toHaveBeenCalledWith(
        '/be/GET/aHR0cHM6Ly9hcGkucG90dGVyZGIuY29tL3YxL2NoYXJhY3RlcnM=?'
      );
    });
  });
});
