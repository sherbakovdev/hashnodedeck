import '../styles/globals.css';

import { AppProps } from 'next/app';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import GlobalStyles from '../globalStyles';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw Error('No NEXT_PUBLIC_API_URL defined in .env');
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />

      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;

declare global {
  export namespace App {
    interface Story {
      slug: string;
      cuid: string;
      title: string;
      dateAdded: string;
      partOfPublication: boolean;

      publication: {
        domain: string;
        username: string;
        subdomain: string;
      };

      author: {
        username: string;
        photo: string | null;
        blogHandle: string | null;
        publicationDomain: string | null;
      };

      replyCount: number;
      responseCount: number;
      totalReactions: number;
      coverImage: string | null;
    }

    type FeedType = 'NEW' | 'BEST' | 'FEATURED' | 'COMMUNITY';

    interface FetcherParams {
      pageParam?: number;
    }
  }
}
