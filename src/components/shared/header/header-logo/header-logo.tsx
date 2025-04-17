import Image from 'next/image';
import Link from 'next/link';

export const HeaderLogo: React.FC = () => {
  return (
    <Link href="/" className="w-30 cursor-pointer">
      <Image
        src="/img/rest-api-1.svg"
        alt="rest"
        width={150}
        height={150}
        className="hover:opacity-50"
        priority={true}
        quality={85}
      />
    </Link>
  );
};
