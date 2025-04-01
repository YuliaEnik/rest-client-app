'use client';
import { useState } from 'react';

import { Developer } from '@/components/developer';
import { developers } from '@/utils';

export default function WelcomePage() {
  const [activeTab, setActiveTab] = useState<'rest' | 'team'>('rest');

  const handleTabChange = (tab: 'rest' | 'team') => {
    setActiveTab(tab);
  };

  const restAppText = `
    A powerful REST API integrated development environment (IDE). 
    This tool provides everything you need to build, test, and debug RESTful services.
    Key features: smart code completion, interactive API testing, built-in documentation,
    and team collaboration support. Perfect for developers, testers, and API architects.
  `;

  const ourTeamText = `
    Our team consists of experienced developers specializing in modern web applications.
    We use cutting-edge technologies and best development practices. Each team member
    contributes to creating a high-quality product. Our specializations include:
    frontend, UX/UI design, and testing.
  `;

  return (
    <div className="flex flex-col min-h-screen items-center w-full my-0 p-5 mx-auto gap-5 primary-color-bg">
      <div className="flex flex-col flex-grow w-full items-center">
        <div className="flex justify-center gap-5">
          <button
            className={`flex h-10 w-42 items-center justify-center cursor-pointer ${activeTab === 'rest' ? 'primary-color-component-bg' : 'bg-gray-300'}`}
            onClick={() => handleTabChange('rest')}
          >
            Rest App
          </button>
          <button
            className={`flex h-10 w-42 items-center justify-center cursor-pointer ${activeTab === 'team' ? 'primary-color-component-bg' : 'bg-gray-300'}`}
            onClick={() => handleTabChange('team')}
          >
            Team
          </button>
        </div>

        <div className="w-screen p-6 primary-color-component-bg flex-grow">
          <div className="flex flex-col items-center max-w-6xl mx-auto px-4 gap-5">
            <h2 className="text-center text-2xl w-full font-medium">
              {activeTab === 'rest' ? 'REST Client' : 'Our Team'}
            </h2>
            <p className="max-w-7xl w-3/4 text-center">
              {activeTab === 'rest' ? restAppText : ourTeamText}
            </p>
          </div>
        </div>
        <div
          className="w-0 h-0 
  border-l-[20px] border-l-transparent
  border-t-[25px] border-t-gray-50
  border-r-[20px] border-r-transparent"
        ></div>
      </div>
      <h2 className="w-full text-center text-xl">WEB Developers of our team</h2>
      <h3 className="w-full text-center">
        We may not have much experience, but we are wearing navy stripes!
      </h3>
      <div className="flex flex-wrap justify-center gap-5 w-full max-w-7xl">
        {developers.map((dev) => (
          <div
            key={dev.id}
            className="w-full sm:w-auto sm:flex-1 sm:min-w-[calc(33.33%-16px)]"
          >
            <Developer key={dev.id} {...dev} />
          </div>
        ))}
      </div>
    </div>
  );
}
