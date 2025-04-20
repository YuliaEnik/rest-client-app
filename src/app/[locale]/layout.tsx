import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { ErrorBoundary } from '@/components/error-boundary';
import { Layout } from '@/components/layout';
import { AuthProvider } from '@/context/auth-context';
import { routing } from '@/i18n/routing';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'REST APP',
  description: 'rest-client-app',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang="be" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex flex-col  h-full`}
      >
        <NextIntlClientProvider>
          <ErrorBoundary>
            <AuthProvider>
              <Layout locale={locale}>{children}</Layout>
            </AuthProvider>
          </ErrorBoundary>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
