import { request } from 'graphql-request';
import gql from 'graphql-tag';
import throttle from 'lodash/throttle';
import * as React from 'react';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

const GET_STORIES_FEED = gql`
  query($type: FeedType!, $page: Int!) {
    storiesFeed(type: $type, page: $page) {
      slug
      cuid
      title
      dateAdded
      partOfPublication

      author {
        photo
        username
        blogHandle
        publicationDomain
      }

      coverImage
      replyCount
      responseCount
      totalReactions
    }
  }
`;

interface Parameters {
  title?: string;
}

export const useFeedQuery = (type: App.FeedType, parameters?: Parameters) => {
  const elRef = React.useRef<HTMLDivElement>(null);

  const fetcher = (params: App.FetcherParams) => {
    const currentPage = params.pageParam || 0;
    const requestParams = { type, page: currentPage };
    return request(process.env.NEXT_PUBLIC_API_URL!, GET_STORIES_FEED, requestParams);
  };

  const options: UseInfiniteQueryOptions<{ storiesFeed: App.Story[] }> = {
    refetchInterval: 60 * 1000,
    getNextPageParam(_: any, pages = []) {
      return pages.length;
    },
  };

  const query = useInfiniteQuery<{ storiesFeed: App.Story[] }>(type, fetcher, options);

  React.useEffect(() => {
    const isOnlyPage = query?.data?.pages.length === 1;
    if (isOnlyPage) query.fetchNextPage();
  }, [query]);

  React.useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const handleScroll = throttle(() => {
      const threshold = 600;
      const position = el.scrollHeight - el.scrollTop - el.clientHeight;

      if (position < threshold) query.fetchNextPage();
    }, 1000);

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const title = parameters ? parameters.title : type;

  return { ...query, ref: elRef, type, title };
};
