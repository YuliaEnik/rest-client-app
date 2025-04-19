import { NextIntlClientProvider } from 'next-intl';
import { render, screen } from '@testing-library/react';
import { User } from 'firebase/auth';
import { describe, expect, test, vi } from 'vitest';

import VariablesPage from '@/app/[locale]/variables/page';

vi.mock('@/context/auth-context', () => ({
  useAuth: vi.fn(() => ({
    user: {} as User,
    loading: false,
  })),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

const messages = {
  loading: 'Loading...',
  variablesPage: {
    title: 'Variables',
    loadingPage: 'Loading Variables Page...',
  },
};

describe('VariablesPage Component', () => {
  test('renders correctly variables page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <VariablesPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('Variables')).toBeTruthy();
  });
});
