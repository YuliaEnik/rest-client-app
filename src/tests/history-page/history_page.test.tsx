import { NextIntlClientProvider } from 'next-intl';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import HistoryPage from '@/app/[locale]/history/page';

const messages = {
  historyPage: {
    title: 'History',
    loadingPage: 'Loading History Page...',
  },
};

describe('HistoryPage Component', () => {
  test('renders correctly history page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HistoryPage />
      </NextIntlClientProvider>
    );

    waitFor(() => {
      expect(screen.getByText('History'));
    });
  });
});
