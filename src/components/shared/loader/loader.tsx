'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export const Loader = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-80 transition-opacity duration-300">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gray-300 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1.4s',
              }}
            />
          ))}
        </div>
        <p className="text-base font-medium text-gray-800">{t('loading')}</p>
      </div>
    </div>
  );
};
