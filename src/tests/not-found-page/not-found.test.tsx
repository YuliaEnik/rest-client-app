import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import NotFound from '@/app/[locale]/not-found';

type Translations = {
  title: string;
  description: string;
  backHome: string;
};

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn().mockResolvedValue((key: keyof Translations) => {
    const translations = {
      title: 'Page Not Found',
      description:
        "The page you're looking for doesn't exist or has been moved.",
      backHome: 'Go Back Home',
    };
    return translations[key];
  }),
}));

describe('NotFound Component', () => {
  afterEach(cleanup);
  test('renders correctly with translations', async () => {
    render(await NotFound());

    const heading = await screen.findByRole('heading', {
      level: 1,
      name: '404',
    });
    expect(heading).toBeTruthy();

    const description = await screen.findByText(
      `The page you're looking for doesn't exist or has been moved.`
    );
    expect(description).toBeTruthy();

    const backHomeLink = await screen.findByRole('link', {
      name: 'Go Back Home',
    });
    expect(backHomeLink).toBeTruthy();
  });
});
