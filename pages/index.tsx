import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DocumentNode } from 'graphql';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import Head from 'next/head';
import * as React from 'react';
import { QueryKey, useQuery, useQueryClient, UseQueryOptions } from 'react-query';

dayjs.extend(relativeTime);

enum FeedType {
  NEW = 'NEW',
  BEST = 'BEST',
  FEATURED = 'FEATURED',
  COMMUNITY = 'COMMUNITY',
}

interface Variables {
  type?: FeedType;
}

const useGQLQuery = (
  key: QueryKey,
  query: DocumentNode,
  variables: Variables = {},
  options: UseQueryOptions = {}
) => {
  const fetcher = async () => await request(process.env.NEXT_PUBLIC_API_URL, query, variables);
  return useQuery<any>(key, fetcher, options);
};

const GET_STORIES_FEED = gql`
  query($type: FeedType!) {
    storiesFeed(type: $type) {
      title
      slug
      dateAdded

      author {
        blogHandle
        username
        photo
      }

      totalReactions
      responseCount
      coverImage
    }
  }
`;

function Feed(feed: any[] = []) {
  function Story(story) {
    const noAvatar =
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1600792675173/rY-APy9Fc.png?w=400&h=400&fit=crop&crop=faces&auto=compress&auto=compress';
    return (
      <div className='flex pb-6'>
        <div className='pr-4 pt-1'>
          <img
            src={story.author.photo || noAvatar}
            className='inline object-cover rounded-full w-10 h-10'
          />
        </div>

        <div className='w-80'>
          <div className='text-white'>
            <div className='flex justify-between text-gray-400'>
              <a className='hover:underline' href={'@' + story.author.username}>
                @{story.author.username}
              </a>
              <div>{dayjs(story.dateAdded).fromNow(true)}</div>
            </div>
          </div>
          <div>
            <a
              href={`https://${story.author.blogHandle || story.author.username}.hashnode.dev/${
                story.slug
              }`}
              target='_blank'
              className='font-bold text-gray-100  hover:underline'
            >
              <span>{story.title}</span>
              <img src={story.coverImage} className='w-full rounded-md mt-2' />
            </a>
          </div>

          {/* <div>{story.totalReactions}</div>
        <div>{story.responseCount}</div> */}
        </div>
      </div>
    );
  }

  return feed.map(Story);
}

export default function Home() {
  const queryClient = useQueryClient();

  React.useEffect(() => {
    const interval = 60 * 1000;
    setInterval(() => {
      queryClient.invalidateQueries();
    }, interval);
    queryClient.invalidateQueries();
  }, []);

  const { data, isLoading } = useGQLQuery('new', GET_STORIES_FEED, { type: FeedType.NEW });
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-96 h-full bg-gray-800 overflow-scroll p-4'>
        {isLoading ? 'Loading' : Feed(data.storiesFeed)}
      </div>
    </>
  );
}
