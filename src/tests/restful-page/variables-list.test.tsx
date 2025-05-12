import { NextIntlClientProvider } from 'next-intl';
import { cleanup, render, screen } from '@testing-library/react';
import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest';

import { VariablesList } from '@/components/restful/variables-list';
import { LOCAL_STORAGE_KEYS } from '@/constants/constants';

const messages = {
  restfulPage: {
    variablesList: 'Список переменных',
    noVariables: 'Переменные не найдены.',
    createVariables: 'Добавить переменные',
  },
};

describe('VariablesList', () => {
  beforeEach(() => {
    render(
      <NextIntlClientProvider locale={'ru'} messages={messages}>
        <VariablesList />
      </NextIntlClientProvider>
    );
  });
  afterEach(() => {
    cleanup();
  });
  afterAll(() => {
    localStorage.clear();
  });
  it('Should display message if no variables in local storage', () => {
    const message = screen.getByText(messages.restfulPage.noVariables);
    expect(message).toBeDefined();
  });
  it('Should display variables list', () => {
    cleanup();
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.VARIABLES,
      '[{"id":"#1","name":"POSTS","value":"posts"},{"id":"#2","name":"TEST","value":"12"}]'
    );
    render(
      <NextIntlClientProvider locale={'ru'} messages={messages}>
        <VariablesList />
      </NextIntlClientProvider>
    );
    const liElements = document.querySelectorAll('li');
    expect(liElements.length).toEqual(2);
  });
});
