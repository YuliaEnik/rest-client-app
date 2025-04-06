'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function RefreshOnFocus() {
  const { refresh } = useRouter();

  useEffect(() => {
    const onFocus = () => {
      refresh();
    };

    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('focus', onFocus);
    };
  }, [refresh]);

  return null;
}
