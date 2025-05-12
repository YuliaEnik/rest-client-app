import { NextIntlClientProvider } from 'next-intl';
import { configure } from '@testing-library/dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { RequestUrl } from '@/components/restful/request-url/request-url';
import { convertToBase64 } from '@/utils/base64';

const messages = {
  restfulPage: {
    urlError: 'API URL должен быть валидным',
  },
};

configure({
  testIdAttribute: 'data-slot',
});

const initLocation = '/ru/GET/';

describe('Request url', () => {
  afterEach(() => {
    cleanup();
  });
  it('Should render correctly', () => {
    render(
      <NextIntlClientProvider locale={'ru'} messages={messages}>
        <RequestUrl url={''} />
      </NextIntlClientProvider>
    );
    const input = screen.getByTestId('input');
    expect(input).toBeDefined();
  });
  it('Should display url', () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/';
    const encodedApiUrl = convertToBase64(apiUrl);
    window.history.pushState(null, '', `${initLocation}${encodedApiUrl}`);
    render(
      <NextIntlClientProvider locale={'ru'} messages={messages}>
        <RequestUrl url={apiUrl} />
      </NextIntlClientProvider>
    );
    const input = screen.getByPlaceholderText('API URL') as HTMLInputElement;
    expect(input.value).toEqual(apiUrl);
  });
  it('Should update url', async () => {
    window.history.pushState(null, '', initLocation);
    render(
      <NextIntlClientProvider locale={'ru'} messages={messages}>
        <RequestUrl url={''} />
      </NextIntlClientProvider>
    );
    const input = screen.getByTestId('input') as HTMLInputElement;
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts/';
    const encodedApiUrl = convertToBase64(apiUrl);
    fireEvent.change(input, { target: { value: apiUrl } });
    await waitFor(() => {
      fireEvent.blur(input);
      const currentLocation = window.location.pathname;
      expect(currentLocation.includes(encodedApiUrl)).toBeTruthy();
    });
  });
});
