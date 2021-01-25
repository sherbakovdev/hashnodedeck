import Image from 'next/image';

import { formatTime } from '../../utils/formatTime';

export default function Story(props: App.Story) {
  const subdomain = props.author.blogHandle || props.author.username;
  const publicationDomain = props.author.publicationDomain;
  const defaultDomain = `${subdomain}.hashnode.dev`;
  const productionDomain = `hashnode.com`;
  const isPartOfPublication = props.partOfPublication;

  const storyURL = isPartOfPublication
    ? `https://${publicationDomain || defaultDomain}/${props.slug}`
    : `https://${productionDomain}/post/${props.slug}`;

  return (
    <div className='flex p-4 min-w-80 border-solid border-gray-900 border-b-2'>
      <div className='pr-4 pt-1'>
        <a target='_blank' href={`https://${productionDomain}/@${props.author.username}`}>
          <Image
            className='inline object-cover rounded-full'
            src={props.author.photo || '/avatar.png'}
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
              href={`https://hashnode.com/@${props.author.username}`}
            >
              @{props.author.username}
            </a>
            <div>{formatTime(props.dateAdded)}</div>
          </div>
        </div>
        <div>
          <a href={storyURL} target='_blank' className='font-bold text-gray-100  hover:underline'>
            <div className='mb-2'>{props.title}</div>

            {props.coverImage ? (
              <Image
                className='inline-block rounded-md object-cover'
                src={props.coverImage}
                loading='eager'
                width='full'
                height='150'
              />
            ) : null}
          </a>
        </div>
      </div>
    </div>
  );
}
