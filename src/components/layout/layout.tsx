import { ReactNode } from 'react';

import { Footer } from '@/components/shared/footer';

import { Header } from '../shared/header/header';
import { StickyHeaderWrapper } from '../shared/header/sticky-wrap';

type Props = {
  children: ReactNode;
  locale: string;
};

export async function Layout({ children, locale }: Props) {
  return (
    <>
      <StickyHeaderWrapper>
        <Header locale={locale} />
      </StickyHeaderWrapper>
      <main className="flex-1 h-full w-full">{children}</main>
      <Footer locale={locale} />
    </>
  );
}
