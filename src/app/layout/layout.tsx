export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header className="flex h-20 w-full justify-between flex-wrap p-4 gap-4 bg-secondary-rose">
        <h2> Header</h2>
      </header>
      <main className="flex-1 w-full">{children}</main>
      <footer className="flex h-20 w-full justify-between flex-wrap p-4 gap-4 bg-primary-dark">
        <h2> Footer</h2>
      </footer>
    </>
  );
};
