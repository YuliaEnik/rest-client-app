import { NextIntlClientProvider } from 'next-intl';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { Variable } from '@/types/types';

import VariableList from './variable_list';

const mockSetVariables = vi.fn();

const messages = {
  variablesPage: {
    emptySavedVars: 'No variables saved.',
    varList: 'Saved variables',
    loadSavedVars: 'Loading...',
  },
};

const setup = (variables: Variable[] = []) => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <VariableList variables={variables} setVariables={mockSetVariables} />
    </NextIntlClientProvider>
  );
};

describe('VariableList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(cleanup);

  test('displays empty state message when no variables are present', async () => {
    setup([]);
    await waitFor(() => {
      expect(screen.getByText('No variables saved.')).toBeTruthy();
    });
  });

  test('renders a list of VariableItem components when variables are present', async () => {
    const variables = [
      { id: '#1', name: 'var1', value: 'val1' },
      { id: '#2', name: 'var2', value: 'val2' },
    ];

    setup(variables);

    await waitFor(() => {
      expect(screen.getByText('Saved variables')).toBeTruthy();
      expect(screen.getAllByDisplayValue('var1')).toBeTruthy();
      expect(screen.getAllByDisplayValue('var2')).toBeTruthy();
    });
  });
});
