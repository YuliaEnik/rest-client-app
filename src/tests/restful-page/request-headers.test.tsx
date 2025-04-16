import { NextIntlClientProvider } from 'next-intl';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RequestHeaders } from '@/components/restful/request-headers';

const messages = {
  restfulPage: {
    headers: 'Заголовки',
    addHeader: 'Добавить заголовок',
    placeholderKey: 'ключ',
    placeholderValue: 'значение',
  },
};

window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('RequestHeaders', () => {
  beforeEach(() => {
    render(
      <NextIntlClientProvider locale={'ru'} messages={messages}>
        <RequestHeaders headers={{ 'Content-Type': 'application/json' }} />
      </NextIntlClientProvider>
    );
  });
  afterEach(() => {
    cleanup();
  });
  it('Should render correctly', () => {
    const title = screen.getByText(messages.restfulPage.headers);
    expect(title).toBeDefined();

    const headerKey = screen.getByPlaceholderText(
      messages.restfulPage.placeholderKey
    ) as HTMLInputElement;
    expect(headerKey.value).toEqual('Content-Type');

    const headerValue = screen.getByPlaceholderText(
      messages.restfulPage.placeholderValue
    ) as HTMLInputElement;
    expect(headerValue.value).toEqual('application/json');
  });
  it('Should add new line for adding headers', () => {
    const headerKeys = screen.getAllByPlaceholderText(
      messages.restfulPage.placeholderKey
    );
    expect(headerKeys.length).toEqual(1);

    const addButton = screen.getByText(messages.restfulPage.addHeader);
    fireEvent.click(addButton);

    const headerValues = screen.getAllByPlaceholderText(
      messages.restfulPage.placeholderValue
    );
    expect(headerValues.length).toEqual(2);
  });
  it('Should update searchParams', () => {
    const addButton = screen.getByText(messages.restfulPage.addHeader);
    fireEvent.click(addButton);

    const headerKeys = screen.getAllByPlaceholderText(
      messages.restfulPage.placeholderKey
    ) as HTMLInputElement[];

    const headerValues = screen.getAllByPlaceholderText(
      messages.restfulPage.placeholderValue
    ) as HTMLInputElement[];

    fireEvent.change(headerKeys[1], { target: { value: 'test' } });
    fireEvent.blur(headerKeys[1]);
    fireEvent.change(headerValues[1], { target: { value: 'test' } });
    fireEvent.blur(headerValues[1]);

    const currentSearchParams = window.location.search;
    expect(currentSearchParams).toEqual(
      '?Content-Type=application%2Fjson&test=test'
    );
  });
});
