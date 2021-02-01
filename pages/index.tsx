import Head from 'next/head';
import tw from 'twin.macro';

import Banner from '../components/Banner';
import Feed from '../components/Feed';
import Logo from '../components/Logo';
import NewArticleButton from '../components/NewArticleButton';
import { useFeed } from '../hooks/useFeed';

export default function Home() {
  const bestFeed = useFeed('BEST');
  const featuredFeed = useFeed('FEATURED');
  const newFeed = useFeed('NEW', { title: 'Recent' });

  const feeds = [newFeed, featuredFeed, bestFeed];

  return (
    <>
      <Head>
        <title>
          Hashnode Deck - a live feed that enables you to discover new trending content on Hashnode
          with ease!
        </title>
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
            <Feed.Container key={feed.type}>
              <Feed.Header>{feed.title}</Feed.Header>
              <Feed.Deck ref={feed.ref}>
                <Feed.Loading on={feed.isLoading} />
                {stories ? <Feed.Stories stories={stories} /> : null}
              </Feed.Deck>
            </Feed.Container>
          );
        })}
      </Page>
    </>
  );
}

const Page = tw.div`flex h-screen overflow-x-auto overflow-y-hidden`;
const Sidebar = tw.div`w-16 h-full bg-gray-800 flex flex-col px-2 py-4 flex-shrink-0 text-center`;
