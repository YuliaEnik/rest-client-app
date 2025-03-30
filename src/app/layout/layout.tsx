import { Footer, Header } from '@/components';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full min-h-screen max-h-screen flex-col text-text-light">
      <Header />
      <main className="flex flex-1 flex-col w-full bg-primary-light">
        {children}
      </main>
      <Footer />
    </div>
  );
};
