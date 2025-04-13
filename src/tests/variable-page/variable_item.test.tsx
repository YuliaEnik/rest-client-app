import { NextIntlClientProvider } from 'next-intl';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { Variable } from '@/types/types';

import { VariableItem } from '../../components/variable/variable_item';

const mockSetVariables = vi.fn();
const mockLocalStorageSet = vi.fn();

const variable: Variable = {
  id: '#1',
  name: 'Test Variable',
  value: 'Test Value',
};

const otherVariable = {
  id: '#2',
  name: 'Other Variable',
  value: 'Other Value',
};

const newVariables = [variable, otherVariable];

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

vi.mock('@/hooks/local_storage', () => ({
  __esModule: true,
  default: () => [[], mockLocalStorageSet],
}));

describe('VariableItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <VariableItem
          variable={variable}
          variables={newVariables}
          setVariables={mockSetVariables}
        />
      </NextIntlClientProvider>
    );
  });

  afterEach(cleanup);

  test('shows error when name is empty', async () => {
    fireEvent.click(screen.getByTestId('edit-button'));
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByPlaceholderText('Value'), {
      target: { value: 'Some Value' },
    });
    fireEvent.click(screen.getByTestId('save-button'));

    await waitFor(() => {
      expect(screen.getByText('Variable name is required')).toBeTruthy();
    });
  });

  test('shows error when value is empty', async () => {
    fireEvent.click(screen.getByTestId('edit-button'));
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Name' },
    });
    fireEvent.change(screen.getByPlaceholderText('Value'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByTestId('save-button'));

    await waitFor(() => {
      expect(screen.getByText('Variable value is required')).toBeTruthy();
    });
  });

  test('successfully submits updated variable values', async () => {
    fireEvent.click(screen.getByTestId('edit-button'));
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'UV' },
    });
    fireEvent.change(screen.getByPlaceholderText('Value'), {
      target: { value: 'UV' },
    });
    fireEvent.click(screen.getByTestId('save-button'));

    await waitFor(() => {
      expect(mockSetVariables).toHaveBeenCalledWith([
        { id: '#1', name: 'UV', value: 'UV' },
        otherVariable,
      ]);
    });
  });

  test('deletes the variable when delete button is clicked', async () => {
    fireEvent.click(screen.getByTestId('delete-button'));

    await waitFor(() => {
      expect(mockLocalStorageSet).toHaveBeenCalledWith([otherVariable]);
      expect(mockSetVariables).toHaveBeenCalledWith([otherVariable]);
    });
  });

  test('does not update other variables when one is edited', async () => {
    fireEvent.click(screen.getByTestId('edit-button'));
    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'UV' },
    });
    fireEvent.change(screen.getByPlaceholderText('Value'), {
      target: { value: 'UV' },
    });
    fireEvent.click(screen.getByTestId('save-button'));

    await waitFor(() => {
      expect(mockSetVariables).toHaveBeenCalledWith([
        { id: '#1', name: 'UV', value: 'UV' },
        otherVariable,
      ]);
    });
  });
});
