import { NextIntlClientProvider } from 'next-intl';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { RequestBody } from '@/components/restful/request-body';

const messages = {
  restfulPage: {
    body: 'Тело запроса',
    prettify: 'Форматировать',
    bodyText: 'Текст',
  },
};

describe('RequestBody', () => {
  afterEach(() => {
    cleanup();
  });
  it('Should render correctly', () => {
    render(
      <NextIntlClientProvider locale={'ru'} messages={messages}>
        <RequestBody body={''} />
      </NextIntlClientProvider>
    );
    const title = screen.getByText(messages.restfulPage.body);
    expect(title).toBeDefined();
  });
  it('Should display value', () => {
    render(
      <NextIntlClientProvider locale={'ru'} messages={messages}>
        <RequestBody body={'{"test": "test"}'} />
      </NextIntlClientProvider>
    );
    const values = screen.getAllByText('"test"');
    expect(values.length).toEqual(2);
  });
});
