import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { Footer } from '@/components';

type Translations = {
  course: string;
};

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: keyof Translations) => {
    const translations = {
      course: 'REACT',
    };
    return translations[key];
  }),
}));

describe('Footer Component', () => {
  afterEach(cleanup);

  test('renders footer with correct content', async () => {
    render(await Footer({ locale: 'en' }));

    const rssLogo = screen.getByAltText('rsschool');
    waitFor(() => {
      expect(rssLogo).toBeTruthy();
      expect(rssLogo).haveOwnProperty('src', '/rss-logo.svg');
    });

    const githubLinks = [
      { name: '@NMakarevich', url: 'https://github.com/NMakarevich' },
      { name: '@anastan588', url: 'https://github.com/anastan588' },
      { name: '@YuliaEnik', url: 'https://github.com/YuliaEnik' },
    ];

    waitFor(() => {
      githubLinks.forEach(({ name, url }) => {
        const link = screen.getByText(name);
        expect(link).toBeTruthy();
        expect(link).haveOwnProperty('href', url);
      });
    });

    waitFor(() => {
      const courseLink = screen.getByText('React Course');
      expect(courseLink).haveOwnProperty(
        'href',
        'https://rs.school/courses/reactjs'
      );
    });
    waitFor(() => {
      const yearText = screen.getByText('2025');
      expect(yearText).toBeTruthy();
    });
  });
});
