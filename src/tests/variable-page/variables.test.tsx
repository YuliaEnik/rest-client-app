import * as actualNavigation from 'next/navigation';
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

vi.mock('next/navigation', async () => {
  const actual =
    await vi.importActual<typeof actualNavigation>('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    })),
    usePathname: vi.fn(() => '/'),
    useSearchParams: vi.fn(() => new URLSearchParams()),
  };
});

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
