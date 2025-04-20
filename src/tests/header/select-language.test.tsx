import { configure } from '@testing-library/dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { LanguageSelect } from '@/components/shared/header/select-lang';

// Мокируем зависимости
vi.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) =>
    ({
      belarusian: 'Belarusian',
      english: 'English',
      russian: 'Russian',
    })[key],
}));

const mockReplace = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
  usePathname: () => '/test',
  useSearchParams: () => new URLSearchParams(),
}));

configure({
  testIdAttribute: 'data-slot',
});

window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('LanguageSelect', () => {
  beforeEach(() => {
    render(<LanguageSelect />);
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('Should render correctly', () => {
    const select = screen.getByRole('combobox');
    expect(select).toBeDefined();
    expect(select.textContent).toContain('EN');
  });

  it('Should change language', () => {
    const select = screen.getByRole('combobox');
    fireEvent.click(select);

    const options = screen.getAllByTestId('select-item');
    const russianOption = options.find((opt) =>
      opt.textContent?.includes('Russian')
    );

    if (!russianOption) {
      throw new Error('Russian option not found');
    }

    fireEvent.click(russianOption);
    expect(mockReplace).toHaveBeenCalledWith(
      { pathname: '/test', query: {} },
      { locale: 'ru' }
    );
  });
});
