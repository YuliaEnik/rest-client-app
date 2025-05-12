import { NextIntlClientProvider } from 'next-intl';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { CreateVariable } from '@/components';

const mockSetVariables = vi.fn();
const mockshowCreateBlock = vi.fn();

const messages = {
  variablesPage: {
    error: 'Error',
    varNamerequired: 'Variable name is required',
    varNameMin: 'Variable name must be at least 2 characters',
    varNameMatch:
      'Variable name must be on English uppercase, camelCase, or uppercase with one underscore',
    varValuerequired: 'Variable value is required',
    varValueMin: 'Variable value must be at least 1 character',
  },
};

describe('CreateVariable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <CreateVariable
          showCreateBlock={mockshowCreateBlock}
          setVariables={mockSetVariables}
        />
      </NextIntlClientProvider>
    );
  });

  afterEach(cleanup);

  test('submits new variable successfully', async () => {
    fireEvent.change(screen.getByPlaceholderText('Variable Name'), {
      target: { value: 'UV' },
    });
    fireEvent.change(screen.getByPlaceholderText('Variable Value'), {
      target: { value: 'UV' },
    });
    fireEvent.click(screen.getByTestId('addnewvar-button'));

    await waitFor(() => {
      expect(mockSetVariables).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.stringMatching(/^#\d+$/),
            name: 'UV',
            value: 'UV',
          }),
        ])
      );
    });
  });

  test('displays error message when name is empty', async () => {
    fireEvent.change(screen.getByPlaceholderText('Variable Value'), {
      target: { value: 'Test Value' },
    });
    fireEvent.click(screen.getByTestId('addnewvar-button'));

    await waitFor(() => {
      expect(screen.getByText('Variable name is required')).toBeTruthy();
    });
  });

  test('displays error message when value is empty', async () => {
    fireEvent.change(screen.getByPlaceholderText('Variable Name'), {
      target: { value: 'Test Variable' },
    });
    fireEvent.click(screen.getByTestId('addnewvar-button'));

    await waitFor(() => {
      expect(screen.getByText('Variable value is required')).toBeTruthy();
    });
  });

  test('resets input fields and closes the block when close button is clicked', async () => {
    fireEvent.change(screen.getByPlaceholderText('Variable Name'), {
      target: { value: 'Test Variable' },
    });
    fireEvent.change(screen.getByPlaceholderText('Variable Value'), {
      target: { value: 'Test Value' },
    });
    fireEvent.click(screen.getByTestId('canceladdnewvar-button'));

    await waitFor(() => {
      const nameInput = screen.getByPlaceholderText(
        'Variable Name'
      ) as HTMLInputElement;
      const valueInput = screen.getByPlaceholderText(
        'Variable Value'
      ) as HTMLInputElement;

      expect(nameInput.value).toBe('');
      expect(valueInput.value).toBe('');
    });
  });
});
