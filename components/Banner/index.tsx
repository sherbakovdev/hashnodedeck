import * as React from 'react';
import tw from 'twin.macro';

const Banner = () => {
  const [hidden, setHidden] = React.useState(false);

  const onHide = React.useCallback(() => {
    setHidden(true);
  }, []);

  if (hidden) return null;

  return (
    <Container onTouchEnd={onHide}>
      Hashnode Deck has no official affiliation with Hashnode. Made by{' '}
      <Link target='_blank' href='https://twitter.com/sherbakovdev'>
        @sherbakovdev
      </Link>{' '}
      for the community. <Link onClick={onHide}>Hide</Link>
    </Container>
  );
};

const Container = tw.div`bg-blue-600 text-white text-sm text-center p-1 w-full`;
const Link = tw.a`underline hover:no-underline cursor-pointer`;

export default Banner;
