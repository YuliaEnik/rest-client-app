export default function BoardPage({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {' '}
      <h2> Board </h2>
      {children}
    </section>
  );
}
