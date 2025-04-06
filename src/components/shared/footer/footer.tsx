import Image from 'next/image';

export const Footer: React.FC = () => {
  return (
    <footer className="flex-0 min-h-10 w-full primary-color-component-bg">
      <div className="flex h-full justify-center items-center flex-wrap gap-1 py-3   px-5 sm:justify-between">
        <a
          className="cursor:pointer color-black"
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
              className="cursor:pointer hover:opacity-50 color-black"
              href="https://github.com/NMakarevich"
              target="_blank"
              rel="noreferrer"
            >
              @NMakarevich
            </a>
          </li>
          <li>
            <a
              className="cursor:pointer hover:opacity-50 color-black"
              href="https://github.com/anastan588"
              target="_blank"
              rel="noreferrer"
            >
              @anastan588
            </a>
          </li>
          <li>
            <a
              className="cursor:pointer hover:opacity-50 color-black"
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
            className="cursor:pointer hover:opacity-50 color-black"
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noreferrer"
          >
            REACT
          </a>
          <p>2025</p>
        </div>
      </div>
    </footer>
  );
};
