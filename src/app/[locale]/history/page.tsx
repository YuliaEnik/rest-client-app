import { ProtectedRoutes } from '@/components/protected-routes';

export default function HistoryPage() {
  return (
    <ProtectedRoutes>
      <section>
        <h2> History </h2>
      </section>
    </ProtectedRoutes>
  );
}
