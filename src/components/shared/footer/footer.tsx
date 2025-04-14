import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export async function Footer({ locale: _locale }: { locale: string }) {
  const t = await getTranslations('footer');

  return (
    <footer className=" min-h-10 w-full primary-color-component-bg">
      <div className="flex h-full justify-center items-center flex-wrap gap-5 py-3   px-5 sm:justify-between">
        <a
          className="cursor-pointer color-black"
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            className="hover:opacity-50"
            src="/img/rss-logo.svg"
            alt="rsschool"
            width={40}
            height={40}
          />
        </a>
        <ul className="flex flex-wrap gap-5">
          <li>
            <a
              className="cursor-pointer hover:opacity-50 color-black"
              href="https://github.com/NMakarevich"
              target="_blank"
              rel="noreferrer"
            >
              @NMakarevich
            </a>
          </li>
          <li>
            <a
              className="cursor-pointer hover:opacity-50 color-black"
              href="https://github.com/anastan588"
              target="_blank"
              rel="noreferrer"
            >
              @anastan588
            </a>
          </li>
          <li>
            <a
              className="cursor-pointer hover:opacity-50 color-black"
              href="https://github.com/YuliaEnik"
              target="_blank"
              rel="noreferrer"
            >
              @YuliaEnik
            </a>
          </li>
        </ul>
        <div className="flex gap-2">
          <a
            className="cursor-pointer hover:opacity-50 color-black"
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noreferrer"
          >
            {t('course')}
          </a>
          <p>2025</p>
        </div>
      </div>
    </footer>
  );
}
