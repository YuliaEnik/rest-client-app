import Image from 'next/image';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="flex w-full justify-between items-center flex-wrap p-2 gap-4 bg-primary-dark">
      <div className="flex gap-2 items-center">
        <h2 className="flex font-bold p-2">Created by Promise Keepers:</h2>
        <div className="flex gap-2 items-center italic">
          <Image src="/github.png" alt="github" width={50} height={50} />
          <Link
            target="_blank"
            href={'https://github.com/YuliaEnik'}
            className="transition-transform transform hover:scale-105 duration-300"
          >
            Yuliya Aleinik
          </Link>
        </div>
        <div className="flex gap-2 items-center italic">
          <Image src="/github.png" alt="github" width={50} height={50} />
          <Link
            target="_blank"
            href={'https://github.com/NMakarevich'}
            className="transition-transform transform hover:scale-105 duration-300"
          >
            Nikolai Makarevich
          </Link>
        </div>
        <div className="flex gap-2 items-center italic">
          <Image src="/github.png" alt="github" width={50} height={50} />
          <Link
            target="_blank"
            href={'https://github.com/anastan588'}
            className="transition-transform transform hover:scale-105 duration-300"
          >
            Anastasiya Andronava
          </Link>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <p className="font-bold">2025</p>
        <Link target="_blank" href={'https://rs.school/'}>
          <Image
            className="rounded-full"
            src="/rsschool.png"
            alt="rsschool"
            width={50}
            height={50}
          />
        </Link>
      </div>
    </footer>
  );
};
