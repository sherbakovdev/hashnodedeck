import tw from 'twin.macro';

import Story from '../Story';

const Container = tw.div`ml-3 h-screen`;
const Deck = tw.div`w-96 h-full bg-gray-800 overflow-scroll flex-shrink-0`;
const Header = tw.div`font-bold text-gray-500 p-4 bg-gray-800 w-96 border-solid border-gray-900 border-b`;

const Stories = ({ stories }: { stories: App.Story[] }) => {
  return (
    <>
      {stories.map((story) => (
        <Story key={story.cuid} {...story} />
      ))}

      <Loading on={true} />
    </>
  );
};

const Loading = ({ on }: { on: boolean }) =>
  on ? <div tw='text-center text-gray-600 mt-6 mb-20'>Loading</div> : null;

export default {
  Deck,
  Header,
  Stories,
  Loading,
  Container,
};
