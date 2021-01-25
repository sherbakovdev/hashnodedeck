import Head from 'next/head';
import tw from 'twin.macro';

import Banner from '../components/Banner';
import Logo from '../components/Logo';
import Story from '../components/Story';
import { useFeedQuery } from '../hooks/useFeedQuery';

export default function Home() {
  const newFeed = useFeedQuery('NEW');
  const bestFeed = useFeedQuery('BEST');
  const featuredFeed = useFeedQuery('FEATURED');

  const feeds = [newFeed, featuredFeed, bestFeed];

  return (
    <>
      <Head>
        <title>Hashnode Deck</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Banner />
      <Page>
        <Sidebar>
          <Logo />
        </Sidebar>

        {feeds.map((feed) => {
          const stories = feed.data ? feed.data.pages.map((feed) => feed.storiesFeed).flat() : null;
          return (
            <FeedContainer>
              <FeedHeader>{feed.type}</FeedHeader>
              <Feed ref={feed.ref} key={feed.type}>
                <FeedLoading on={feed.isLoading} />
                <FeedStories stories={stories} />
              </Feed>
            </FeedContainer>
          );
        })}
      </Page>
    </>
  );
}

const Page = tw.div`flex h-screen overflow-x-auto overflow-y-hidden`;
const Sidebar = tw.div`w-16 h-full bg-gray-800 flex flex-col p-4 flex-shrink-0`;

const FeedContainer = tw.div`pb-20`;
const Feed = tw.div`w-96 h-full	bg-gray-800 overflow-scroll ml-3 flex-shrink-0 relative`;
const FeedHeader = tw.div`ml-3 capitalize font-bold text-gray-500 p-4 bg-gray-800 w-96 border-solid border-gray-900 border-b`;
const FeedStories = ({ stories }: { stories: App.Story[] | null }) => {
  return stories ? (
    <>
      {stories.map((story) => (
        <Story key={story.cuid} {...story} />
      ))}
      <FeedLoading on={true} />
    </>
  ) : null;
};

const FeedLoading = ({ on }: { on: boolean }) =>
  on ? <div tw='text-center text-gray-600 my-6'>Loading</div> : null;
