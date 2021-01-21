import '../styles/globals.css';

import { AppProps } from 'next/app';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw Error('No NEXT_PUBLIC_API_URL defined in .env');
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
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

      author: {
        username: string;
        photo: string | null;
        blogHandle: string | null;
      };

      totalReactions: number;
      responseCount: number;
      coverImage: string | null;
    }

    type FeedType = 'NEW' | 'BEST' | 'FEATURED' | 'COMMUNITY';

    interface FetcherParams {
      pageParam?: number;
    }
  }
}
