import { configure } from '@testing-library/dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LanguageSelect } from '@/components/shared/header/select-lang';

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) =>
    ({
      belarusian: 'Belarusian',
      english: 'English',
      russian: 'Russian',
    })[key] || key,
  useRouter: () => ({
    replace: vi.fn(),
  }),
  usePathname: () => '/test',
}));

configure({
  testIdAttribute: 'data-slot',
});

window.HTMLElement.prototype.scrollIntoView = () => {};

describe('LanguageSelect', () => {
  let replaceMock: any;

  beforeEach(() => {
    replaceMock = vi.fn();
    require('next-intl').useRouter.mockReturnValue({ replace: replaceMock });

    render(<LanguageSelect />);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('should change language on option select', () => {
    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    const russianOption = screen.getByText('Russian');
    fireEvent.click(russianOption);

    expect(replaceMock).toHaveBeenCalledWith(
      { pathname: '/test', query: {} },
      { locale: 'ru' }
    );
  });
});
