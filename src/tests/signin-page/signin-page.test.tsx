import { NextIntlClientProvider } from 'next-intl';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { beforeEach } from 'node:test';
import { afterEach, describe, expect, test, vi } from 'vitest';

import SignInPage from '@/app/[locale]/(auth)/signin/page';
import { signInWithEmail } from '@/lib/auth';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  signInWithEmail: vi.fn(),
}));

const messages = {
  auth: {
    signInTitle: 'Sign In',
    signUpTitle: 'Sign Up',
    displayName: 'Name',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signIn_description_part1: "Don't have an account,",
    signUp_description_part1: 'Already have an account,',
    signIn_description_part2: 'create an account',
    signUp_description_part2: 'log in',
    errors: {
      displayName_required: 'Display name is required',
      email_required: 'Email is required',
      email_invalid: 'Invalid email format',
      password_required: 'Password is required',
      password_min: 'Password must be at least 8 characters',
      password:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character(@#$!%*?&<>',
      auth_failed: 'Authentication failed',
      email_already_used: 'This email is already registered',
    },
  },
};

describe('SignInPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(cleanup);

  test('renders sign in form', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInPage />
      </NextIntlClientProvider>
    );
    waitFor(() => {
      expect(screen.getByText('Sign In')).toBeTruthy();
      expect(screen.getByLabelText('Email')).toBeTruthy();
      expect(screen.getByLabelText('Password')).toBeTruthy();
      expect(screen.getByLabelText('Sign In')).toBeTruthy();
    });
  });

  test('toggles password visibility', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInPage />
      </NextIntlClientProvider>
    );
    const passwordInput = screen.getByLabelText('Password');
    const toggleButton = screen.getByTestId('eye');
    waitFor(() => {
      expect(passwordInput).haveOwnProperty('type', 'password');
    });

    fireEvent.click(toggleButton);
    waitFor(() => {
      expect(passwordInput).haveOwnProperty('type', 'text');
    });

    fireEvent.click(toggleButton);
    waitFor(() => {
      expect(passwordInput).haveOwnProperty('type', 'password');
    });
  });

  test('submits the form successfully', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <SignInPage />
      </NextIntlClientProvider>
    );
    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    const signInButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(signInButton);
    waitFor(() => {
      expect(signInWithEmail).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
