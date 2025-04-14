import { NextIntlClientProvider } from 'next-intl';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import VariablesPage from '@/app/[locale]/variables/page';

const messages = {
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
    expect(screen.getByText('Variables'));
  });
});
