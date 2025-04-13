import { NextIntlClientProvider } from 'next-intl';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { AddButton } from '@/components';

const messages = {
  variablesPage: {
    addButton: 'New variable',
  },
};

describe('AddButton', () => {
  const setVariablesMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('toggles input block visibility when button is clicked', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <AddButton setVariables={setVariablesMock} />
      </NextIntlClientProvider>
    );
    const button = screen.getByRole('button', { name: 'New variable' });

    waitFor(() => {
      expect(screen.queryByTestId('variable-input-block')).toBeNull();
    });
    fireEvent.click(button);
    waitFor(() => {
      expect(screen.getByTestId('variable-input-block')).toBeTruthy();
    });
    waitFor(() => {
      expect(screen.queryByTestId('variable-input-block')).toBeNull();
    });
  });
});
