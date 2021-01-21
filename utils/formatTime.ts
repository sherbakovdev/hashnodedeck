import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatTime = (timestamp: string) => {
  return `${dayjs(timestamp).fromNow(true)} ago`;
};
