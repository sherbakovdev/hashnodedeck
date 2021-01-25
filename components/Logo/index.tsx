import Image from 'next/image';
import tw from 'twin.macro';

const Logo = () => {
  return (
    <div>
      <Image src='/logo.png' alt='Hashnode logo' width='50' height='50' />
      <Name>Deck</Name>
    </div>
  );
};

const Name = tw.div`text-blue-600 cursor-default text-sm`;

export default Logo;
