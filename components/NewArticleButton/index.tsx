import { usePopperTooltip } from 'react-popper-tooltip';

const NewArticleButton = () => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } = usePopperTooltip({
    placement: 'right',
  });

  return (
    <>
      <button
        ref={setTriggerRef}
        onClick={() => window.open('https://hn.new')}
        className='bg-blue-600 text-white rounded leading-none p-2 hover:bg-blue-800 mt-4 text-center'
      >
        <svg className='w-6 h-6 opacity-75 fill-current inline' viewBox='0 0 512 512'>
          <path d='M384 250v12c0 6.6-5.4 12-12 12h-98v98c0 6.6-5.4 12-12 12h-12c-6.6 0-12-5.4-12-12v-98h-98c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h98v-98c0-6.6 5.4-12 12-12h12c6.6 0 12 5.4 12 12v98h98c6.6 0 12 5.4 12 12zm120 6c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z'></path>
        </svg>
      </button>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({
            className:
              'bg-blue-800 opacity-95 text-sm py-1 px-1.5 before:bg-blue-100 z-50 text-white rounded',
          })}
        >
          Write an article
        </div>
      )}
    </>
  );
};

export default NewArticleButton;
