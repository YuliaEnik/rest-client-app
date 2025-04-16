import { NextIntlClientProvider } from 'next-intl';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import RestfulView from '@/components/restful/restful-view/restful-view';

const messages = {
  restfulPage: {
    urlError: 'API URL должен быть валидным',
    send: 'Отправить',
    headers: 'Заголовки',
    addHeader: 'Добавить заголовок',
    placeholderKey: 'ключ',
    placeholderValue: 'значение',
    snippet: 'Фрагмент кода запроса',
    snippetMessage:
      'Пожалуйста, укажите хотя бы URL-адрес api для генерации фрагмента запроса',
    body: 'Тело запроса',
    prettify: 'Форматировать',
    bodyText: 'Текст',
    response: 'Ответ',
    status: 'Статус: ',
    variablesList: 'Список переменных',
    noVariables: 'Переменные не найдены.',
    createVariables: 'Добавить переменные',
  },
};

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/ru/get'),
  useSearchParams: vi.fn(),
}));

window.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe('Restful View', () => {
  it('Should render correctly', () => {
    render(
      <NextIntlClientProvider messages={messages} locale={'ru'}>
        <RestfulView method={'GET'} url={[]} headers={{}} />
      </NextIntlClientProvider>
    );
    const sendButton = screen.getByText(messages.restfulPage.send);
    expect(sendButton).toBeDefined();
  });
});
