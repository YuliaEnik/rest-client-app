import { NextIntlClientProvider } from 'next-intl';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { HistoryList } from '@/components';
import { History } from '@/types/types';

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  };
});

const messages = {
  historyPage: {
    emptySavedRequests: 'No requests saved.',
    historyList: 'Previous requests',
    loadSavedRequests: 'Loading...',
    goToRestfulPage: 'Restful page',
    historyListTable: 'List of your previous requests',
    historyListTableResult: 'Total amount of requests',
    requestDate: 'Date of request',
    requestType: 'Type of request',
    requestURL: 'URL of request',
  },
};

const setup = (requests: History[] = []) => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <HistoryList requests={requests} />
    </NextIntlClientProvider>
  );
};

describe('HistoryList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(cleanup);

  test('displays empty state message when no requests are present', async () => {
    setup([]);
    await waitFor(() => {
      expect(screen.getByText('No requests saved.')).toBeTruthy();
    });
  });

  test('renders a list of HistoryItem components when requests are present', async () => {
    const requests = [
      {
        executedAt: 1744924534290,
        restfulUrl:
          '/be/GET/aHR0cHM6Ly9hcGkucG90dGVyZGIuY29tL3YxL2NoYXJhY3RlcnM=?',
        apiUrl: 'https://api.potterdb.com/v1/characters',
      },
      {
        executedAt: 1744929448274,
        restfulUrl:
          '/be/GET/aHR0cHM6Ly9hcGkucG90dGVyZGIuY29tL3YxL2NoYXJhY3RlcnM=',
        apiUrl: 'https://api.potterdb.com/v1/characters',
      },
    ];

    setup(requests);

    await waitFor(() => {
      expect(screen.getByText('Previous requests')).toBeTruthy();
      expect(screen.getByText('List of your previous requests')).toBeTruthy();
      expect(screen.getByText('Total amount of requests')).toBeTruthy();
      expect(screen.getByText('2')).toBeTruthy();
    });
  });
});
