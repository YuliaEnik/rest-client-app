'use client';
export default function TestErrorPage() {
  throw new Error('Тест ErrorBoundary');
  return <div>Это не отобразится</div>;
}
