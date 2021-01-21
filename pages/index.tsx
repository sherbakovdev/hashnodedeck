import Head from 'next/head';
import Image from 'next/image';

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

      <div className='bg-blue-600 text-white text-sm text-center p-1'>
        HashnodeDeck has no official affiliation with{' '}
        <a className='hover:underline' target='_blank' href='https://hashnode.com/'>
          Hashnode
        </a>
        . Made with ♥ by{' '}
        <a
          className='underline hover:no-underline'
          target='_blank'
          href='https://twitter.com/sherbakovdev'
        >
          @sherbakovdev
        </a>{' '}
        for the community.
      </div>
      <div className='flex h-full overflow-x-auto'>
        <div className='w-16 h-full bg-gray-800 flex flex-col p-4  flex-shrink-0'>
          <div>
            <Image src='/logo.png' alt='Hashnode logo' width='50' height='50' />
          </div>
          <div className='text-blue-600 cursor-default text-sm'>Deck</div>
        </div>
        {feeds.map((feed) => {
          return (
            <div
              ref={feed.ref}
              className='w-96 h-full bg-gray-800 overflow-scroll ml-3 flex-shrink-0'
            >
              <div className='capitalize font-bold text-gray-500 p-4 fixed bg-gray-800 z-50 w-96 border-solid border-gray-900 border-b'>
                {feed.type}
              </div>
              {feed.isLoading ? (
                <div className='text-center text-gray-600 mt-24'>Loading</div>
              ) : (
                <div className='mt-14'>
                  {feed.data?.pages.map((feed) =>
                    feed.storiesFeed.map((story) => <Story key={story.cuid} {...story} />)
                  )}
                </div>
              )}

              {feed.data?.pages ? (
                <div className='text-center text-gray-600 my-4'>Loading more...</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
