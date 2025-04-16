import { NextIntlClientProvider } from 'next-intl';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { HttpSnippet } from '@/components/restful/http-snippet/http-snippet';

const messages = {
  restfulPage: {
    snippet: 'Фрагмент кода запроса',
    snippetMessage:
      'Пожалуйста, укажите хотя бы URL-адрес api для генерации фрагмента запроса',
  },
};

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/ru/get'),
  useSearchParams: vi.fn(),
}));

describe('HttpSnippet', () => {
  beforeEach(() => {
    render(
      <NextIntlClientProvider locale={'ru'} messages={messages}>
        <HttpSnippet />
      </NextIntlClientProvider>
    );
  });
  afterEach(() => {
    cleanup();
  });
  it('Should render correctly', () => {
    const title = screen.getByText(messages.restfulPage.snippet);
    expect(title).toBeDefined();
  });
  it('Should display message', () => {
    const title = screen.getByText(messages.restfulPage.snippet);
    fireEvent.click(title);
    const message = screen.getByText(
      messages.restfulPage.snippetMessage.split(',')[0]
    );
    expect(message).toBeDefined();
  });
});
