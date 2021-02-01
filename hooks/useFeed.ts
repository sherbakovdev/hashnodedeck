import { request } from 'graphql-request';
import gql from 'graphql-tag';
import capitalize from 'lodash/capitalize';
import throttle from 'lodash/throttle';
import * as React from 'react';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';

export const useFeed = (type: App.FeedType, parameters?: App.FeedParams) => {
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
    // Fetch the second page straight away
    const isOnlyPage = query?.data?.pages.length === 1;
    if (isOnlyPage) query.fetchNextPage();
  }, [query]);

  React.useEffect(() => {
    // Fetch the next page based on threshold
    const el = elRef.current;
    if (!el) return;

    const handleScroll = throttle(() => {
      const threshold = 800;
      const position = el.scrollHeight - el.scrollTop - el.clientHeight;
      if (position < threshold) query.fetchNextPage();
    }, 1000);

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [query.fetchNextPage]);

  const title = capitalize(parameters ? parameters.title : type);
  return { ...query, ref: elRef, type, title };
};

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
