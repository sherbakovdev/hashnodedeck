import tw from 'twin.macro';

const Logo = () => {
  return (
    <Container>
      <LogoSVG viewBox='0 0 200 200' fill='none'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M13.742 66.824c-18.323 18.323-18.323 48.029 0 66.352l53.082 53.082c18.323 18.323 48.029 18.323 66.352 0l53.082-53.082c18.323-18.323 18.323-48.03 0-66.352l-53.082-53.082c-18.323-18.323-48.03-18.323-66.352 0L13.742 66.824zm109.481 56.399c12.826-12.826 12.826-33.62 0-46.446s-33.62-12.826-46.446 0-12.826 33.62 0 46.446 33.62 12.826 46.446 0z'
        />
      </LogoSVG>
      <Name>Deck</Name>
    </Container>
  );
};

const Container = tw.div`text-blue-700`;
const LogoSVG = tw.svg`w-10 h-10 fill-current inline`;
const Name = tw.div`cursor-default text-sm text-gray-300 pt-1`;

export default Logo;
