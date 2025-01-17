import Image from 'next/image';
import * as React from 'react';
import tw from 'twin.macro';

import { formatTime } from '../../utils/formatTime';

export default function Story(props: App.Story) {
  const [hasCoverImageError, setCoverImageError] = React.useState(false);

  const subdomain = props.author.blogHandle || props.author.username;
  const publicationDomain = props.author.publicationDomain;
  const isPartOfPublication = props.partOfPublication;

  const defaultDomain = `${subdomain}.${process.env.NEXT_PUBLIC_DEV_HOST!}`;
  const productionDomain = process.env.NEXT_PUBLIC_PROD_HOST!;

  const storyURL = isPartOfPublication
    ? `https://${publicationDomain || defaultDomain}/${props.slug}`
    : `https://${productionDomain}/post/${props.slug}`;

  const profileURL = `https://${productionDomain}/@${props.author.username}`;

  return (
    <Container>
      <AvatarContainer>
        <a target='_blank' rel='noopener noreferrer' href={profileURL}>
          <Avatar src={props.author.photo || '/avatar.png'} width='42' height='42' />
        </a>
      </AvatarContainer>

      <Content>
        <Header>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={`https://hashnode.com/@${props.author.username}`}
          >
            @{props.author.username}
          </a>
          <div>{formatTime(props.dateAdded)}</div>
        </Header>

        <div>
          <a href={storyURL} rel='noopener noreferrer' target='_blank'>
            <Title>{props.title}</Title>

            {props.coverImage && !hasCoverImageError ? (
              <CoverImage
                onError={() => setCoverImageError(true)}
                src={props.coverImage}
                width='full'
                height='150'
              />
            ) : null}
          </a>
        </div>

        <Reactions>
          <Reaction>
            <svg tw='fill-current mr-1 w-5 h-5' viewBox='0 0 512 512'>
              <path d='M496.656 285.683C506.583 272.809 512 256 512 235.468c-.001-37.674-32.073-72.571-72.727-72.571h-70.15c8.72-17.368 20.695-38.911 20.695-69.817C389.819 34.672 366.518 0 306.91 0c-29.995 0-41.126 37.918-46.829 67.228-3.407 17.511-6.626 34.052-16.525 43.951C219.986 134.75 184 192 162.382 203.625c-2.189.922-4.986 1.648-8.032 2.223C148.577 197.484 138.931 192 128 192H32c-17.673 0-32 14.327-32 32v256c0 17.673 14.327 32 32 32h96c17.673 0 32-14.327 32-32v-8.74c32.495 0 100.687 40.747 177.455 40.726 5.505.003 37.65.03 41.013 0 59.282.014 92.255-35.887 90.335-89.793 15.127-17.727 22.539-43.337 18.225-67.105 12.456-19.526 15.126-47.07 9.628-69.405zM32 480V224h96v256H32zm424.017-203.648C472 288 472 336 450.41 347.017c13.522 22.76 1.352 53.216-15.015 61.996 8.293 52.54-18.961 70.606-57.212 70.974-3.312.03-37.247 0-40.727 0-72.929 0-134.742-40.727-177.455-40.727V235.625c37.708 0 72.305-67.939 106.183-101.818 30.545-30.545 20.363-81.454 40.727-101.817 50.909 0 50.909 35.517 50.909 61.091 0 42.189-30.545 61.09-30.545 101.817h111.999c22.73 0 40.627 20.364 40.727 40.727.099 20.363-8.001 36.375-23.984 40.727zM104 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z'></path>
            </svg>
            {props.totalReactions}
          </Reaction>

          <Reaction>
            <svg tw='fill-current mr-2 w-5 h-5' viewBox='0 0 512 512'>
              <path d='M280 272H136c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h144c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm96-96H136c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 384c-28.3 0-56.3-4.3-83.2-12.8l-15.2-4.8-13 9.2c-23 16.3-58.5 35.3-102.6 39.6 12-15.1 29.8-40.4 40.8-69.6l7.1-18.7-13.7-14.6C47.3 313.7 32 277.6 32 240c0-97 100.5-176 224-176s224 79 224 176-100.5 176-224 176z'></path>
            </svg>
            {props.replyCount + props.responseCount}
          </Reaction>
        </Reactions>
      </Content>
    </Container>
  );
}

const Container = tw.div`w-full flex p-4 border-solid border-gray-900 border-b-2`;

const AvatarContainer = tw.div`pr-4 pt-1 flex-shrink-0`;
const Avatar = tw(Image)`inline object-cover rounded-full `;

const Content = tw.div`text-white`;
const Title = tw.div`mb-3 font-bold text-gray-100`;
const Header = tw.div`flex justify-between text-gray-500`;
const CoverImage = tw(Image)`rounded-md object-cover opacity-70`;

const Reactions = tw.div`flex text-gray-500 mt-1 cursor-default`;
const Reaction = tw.div`flex items-center pl-5 first:pl-0`;
