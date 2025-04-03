import Image from 'next/image';

export const HeaderLogo: React.FC = () => {
  return (
    <div className="w-30 cursor-pointer">
      <Image
        src="/img/rest-api-1.svg"
        alt="rest"
        width={150}
        height={150}
        className="hover:opacity-50"
        priority={true}
        quality={85}
      />
    </div>
  );
};
