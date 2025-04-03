import { useCallback, useLayoutEffect, useState } from 'react';

export const useStickyHeader = (offset = 0) => {
  const [sticky, setSticky] = useState(false);

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY > offset);
  }, [offset]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return sticky;
};
