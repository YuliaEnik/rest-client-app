'use client';

import { useStickyHeader } from '@/hooks/sticky-header';

export function StickyHeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const sticky = useStickyHeader(1);

  return (
    <div
      className={
        sticky
          ? 'bg-gray-100 sticky top-0 z-50 shadow-md'
          : 'primary-color-component-bg'
      }
    >
      {children}
    </div>
  );
}
