import { useCallback, useLayoutEffect, useState } from 'react';

export const useStickyHeader = (offset = 0) => {
  const [stick, setStick] = useState(false);

  const handleScroll = useCallback(() => {
    setStick(window.scrollY > offset);
  }, [offset]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return stick;
};
