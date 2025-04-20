'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { IDeveloper } from '@/types/types';

import { GitHubIcon } from '../github-Icon';

export function Developer(props: IDeveloper) {
  const t = useTranslations('developers');

  return (
    <li className="flex flex-1 flex-col flex-wrap gap-5  px-7 py-5  primary-color-component-bg">
      <div className="flex w-full justify-center items-center">
        <Image
          src={props.photo}
          alt="Developer photo"
          width={130}
          height={130}
          className="rounded-full object-cover aspect-square"
          priority={true}
          quality={85}
        />
      </div>
      <div className="flex gap-5 items-center justify-center">
        <h2 className="text-3xl">{t(props.name)}</h2>
        <a
          href={props.gitHub}
          target="_blank"
          rel="noreferrer"
          className="hover-opacity-50 color-details-primary"
        >
          <GitHubIcon />
        </a>
      </div>
      <ul>
        {props.tasks.map((taskKey, index) => (
          <li
            key={index}
            style={{
              paddingLeft: '30px',
              position: 'relative',
              marginBottom: '3px',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#66f44a',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              &lt;/&gt;
            </span>
            <span
              style={{
                marginLeft: '8px',
              }}
            >
              {' '}
              {t(taskKey)}
            </span>
          </li>
        ))}
      </ul>
      <p>{t(props.description)}</p>
    </li>
  );
}
