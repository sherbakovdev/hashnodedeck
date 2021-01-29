import 'react-popper-tooltip/dist/styles.css';

import Head from 'next/head';
import * as React from 'react';
import tw from 'twin.macro';

import Banner from '../components/Banner';
import Logo from '../components/Logo';
import NewArticleButton from '../components/NewArticleButton';
import Story from '../components/Story';
import { useFeedQuery } from '../hooks/useFeedQuery';

export default function Home() {
  const newFeed = useFeedQuery('NEW', { title: 'Recent' });
  const bestFeed = useFeedQuery('BEST', { title: 'Best' });
  const featuredFeed = useFeedQuery('FEATURED', { title: 'Featured' });

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
          <NewArticleButton />
        </Sidebar>
        {feeds.map((feed) => {
          const stories = feed.data ? feed.data.pages.map((feed) => feed.storiesFeed).flat() : null;
          return (
            <FeedContainer key={feed.title}>
              <FeedHeader>{feed.title}</FeedHeader>
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
const Sidebar = tw.div`w-16 h-full bg-gray-800 flex flex-col px-2 py-4 flex-shrink-0 text-center`;

const FeedContainer = tw.div``;
const Feed = tw.div`w-96 h-full	bg-gray-800 overflow-scroll ml-3 flex-shrink-0 relative`;
const FeedHeader = tw.div`ml-3 font-bold text-gray-500 p-4 bg-gray-800 w-96 border-solid border-gray-900 border-b`;
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
