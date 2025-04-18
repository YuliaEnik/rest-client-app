import React from 'react';
import { useTranslations } from 'next-intl';

export const Loader = () => {
  const t = useTranslations();

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full gap-2">
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
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
