import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DocumentNode } from 'graphql';
import { request } from 'graphql-request';
import gql from 'graphql-tag';
import { throttle } from 'lodash';
import Head from 'next/head';
import Image from 'next/image';
import * as React from 'react';
import {
    QueryKey,
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    useQuery,
    useQueryClient,
    UseQueryOptions
} from 'react-query';

dayjs.extend(relativeTime);

enum FeedType {
  NEW = 'NEW',
  BEST = 'BEST',
  FEATURED = 'FEATURED',
  COMMUNITY = 'COMMUNITY',
}

interface Variables {
  type?: FeedType;
  page?: number;
}

// const useGQLQuery = (
//   key: QueryKey,
//   query: DocumentNode,
//   variables: Variables = {},
//   options: UseQueryOptions = {}
// ) => {
//   const fetcher = async () => await request(process.env.NEXT_PUBLIC_API_URL, query, variables);
//   return useQuery<any>(key, fetcher, options);
// };

const useInfiniteGQLQuery = (
  key: QueryKey,
  query: DocumentNode,
  variables: Variables = {},
  options: UseInfiniteQueryOptions = {}
) => {
  // const [page, setPage] = React.useState(0);

  const fetcher = async (params: any) => {
    return await request(process.env.NEXT_PUBLIC_API_URL, query, {
      ...variables,
      page: params.pageParam || 0,
    });
  };

  return useInfiniteQuery(key, fetcher, options);
};

const GET_STORIES_FEED = gql`
  query($type: FeedType!, $page: Int!) {
    storiesFeed(type: $type, page: $page) {
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

function Feed(props) {
  function Story(story) {
    const noAvatar =
      'https://cdn.hashnode.com/res/hashnode/image/upload/v1600792675173/rY-APy9Fc.png?w=400&h=400&fit=crop&crop=faces&auto=compress&auto=compress';
    return (
      <div className='flex pb-6 min-w-80'>
        <div className='pr-4 pt-1'>
          <a target='_blank' href={`https://hashnode.com/@${story.author.username}`}>
            <Image
              className='inline object-cover rounded-full'
              src={story.author.photo || noAvatar}
              width='42'
              height='42'
            />
          </a>
        </div>

        <div className='w-80'>
          <div className='text-white'>
            <div className='flex justify-between text-gray-400'>
              <a
                target='_blank'
                className='hover:underline'
                href={`https://hashnode.com/@${story.author.username}`}
              >
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
              <div className='mb-2'>{story.title}</div>

              {story.coverImage ? (
                <Image
                  className='inline-block rounded-md object-cover'
                  src={story.coverImage}
                  loading='eager'
                  width='full'
                  height='150'
                />
              ) : null}
            </a>
          </div>

          {/* <div>{story.totalReactions}</div>
        <div>{story.responseCount}</div> */}
        </div>
      </div>
    );
  }

  return props.feed.map(Story);
}

export default function Home() {
  const queryClient = useQueryClient();

  // React.useEffect(() => {
  //   const interval = 60 * 1000;
  //   setInterval(() => {
  //     queryClient.invalidateQueries();
  //   }, interval);
  //   queryClient.invalidateQueries();
  // }, []);

  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current) {
      const handleScroll = throttle((event) => {
        const el = event.target;

        if (el.scrollHeight - el.scrollTop - el.clientHeight < 700) {
          fetchNextPage();
        }
      }, 1000);

      ref.current!.addEventListener('scroll', handleScroll);
      return () => ref.current!.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // const { data, isLoading } = useGQLQuery('new', GET_STORIES_FEED, { type: FeedType.NEW, page: 0 });
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteGQLQuery(
    'new_infinite',
    GET_STORIES_FEED,
    { type: FeedType.NEW },
    {
      getNextPageParam: (_, pages) => {
        return pages ? pages.length : 0;
      },
    }
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex h-full'>
        <div className='w-16 h-full  bg-gray-800 flex justify-center items-start p-4 mr-3'>
          <Image src='/logo.png' alt='Hashnode logo' width='50' height='50' />
        </div>
        <div ref={ref} className='w-96 h-full bg-gray-800 overflow-scroll p-4'>
          {isLoading ? 'Loading' : data.pages.map((page: any) => <Feed feed={page.storiesFeed} />)}
          {isFetchingNextPage ? (
            <div className='text-center text-gray-600 my-4'>Loading more...</div>
          ) : null}
        </div>
      </div>
    </>
  );
}
