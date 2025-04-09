import { useTranslations } from 'next-intl';

interface TabsProps {
  activeTab: 'rest' | 'team';
  onTabChange: (tab: 'rest' | 'team') => void;
}

export const Tabs = ({ activeTab, onTabChange }: TabsProps) => {
  const t = useTranslations('welcomePage');

  return (
    <div className="w-full">
      {/* Radio tabs - hidden visually but functional */}
      <div className="flex justify-center gap-5">
        <label className="cursor-pointer">
          <input
            type="radio"
            name="tabs"
            value="rest"
            checked={activeTab === 'rest'}
            onChange={() => onTabChange('rest')}
            className="sr-only"
          />
          <span
            className={`
            flex h-10 w-42 items-center justify-center
            ${
              activeTab === 'rest'
                ? 'bg-primary-component text-white'
                : 'bg-gray-300 hover:bg-gray-200'
            }
            rounded-md transition-colors
          `}
          >
            {t('tabs.restApp')}
          </span>
        </label>

        <label className="cursor-pointer">
          <input
            type="radio"
            name="tabs"
            value="team"
            checked={activeTab === 'team'}
            onChange={() => onTabChange('team')}
            className="sr-only"
          />
          <span
            className={`
            flex h-10 w-42 items-center justify-center
            ${
              activeTab === 'team'
                ? 'bg-primary-component text-white'
                : 'bg-gray-300 hover:bg-gray-200'
            }
            rounded-md transition-colors
          `}
          >
            {t('tabs.team')}
          </span>
        </label>
      </div>

      {/* Tab content */}
      <div className="w-screen p-6 bg-primary-component flex-grow mt-2">
        <div className="flex flex-col items-center sm:max-w-6xl mx-auto px-4 gap-5">
          <h2 className="w-full text-center text-2xl font-medium text-white">
            {activeTab === 'rest'
              ? t('titles.restClient')
              : t('titles.ourTeam')}
          </h2>
          <p className="max-w-7xl w-3/4 text-center text-white">
            {activeTab === 'rest'
              ? t('descriptions.restApp')
              : t('descriptions.team')}
          </p>
        </div>
      </div>
    </div>
  );
};
