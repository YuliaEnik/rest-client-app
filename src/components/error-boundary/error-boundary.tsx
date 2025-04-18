'use client';
import { Component, ReactNode } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  children: ReactNode;
}

export class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

function ErrorFallback() {
  const t = useTranslations('ErrorBoundary');
  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold mb-2">{t('title')}</h1>
      <p>{t('message')}</p>
    </div>
  );
}
