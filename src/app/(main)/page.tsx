import { ReactNode } from 'react';

export default async function MainPage({ children }: { children: ReactNode }) {
  return (
    <>
      <h2> if auth ...</h2>
      {children}
    </>
  );
}
