import { Footer } from '@/components/shared/footer';

import { Header } from '../shared/header/header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </>
  );
};
