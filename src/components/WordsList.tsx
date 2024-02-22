import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Accordion from './ui/Accordion';
import { Loader2 } from 'lucide-react';

const WordsList = ({ changeQuery }: { changeQuery: (str: string) => void }) => {
  const words = useSelector((state: RootState) => state.words);
  const status = useSelector((state: RootState) => state.status);

  if (status === 'loading') {
    return (
      <div className='flex grow items-center justify-center'>
        <Loader2 className='size-20 animate-spin stroke-blue-400' />
      </div>
    );
  }
  if (words.length === 0) {
    return (
      <div className='flex grow items-center justify-center'>
        <p className='text-2xl text-gray-400'>No words</p>
      </div>
    );
  }
  if (status === 'advice') {
    return (
      <>
        <div className='flex grow flex-col items-center justify-center gap-1'>
          <p className='text-2xl text-gray-400'>Maybe you mean:</p>
          {words.map(
            (item, index) =>
              typeof item === 'string' && (
                <button
                  key={index}
                  className='capitalize hover:text-blue-400'
                  onClick={() => {
                    changeQuery(item);
                  }}
                >
                  {item}
                </button>
              ),
          )}
        </div>
      </>
    );
  }

  return (
    <ul className='space-y-3'>
      {words.map(
        (item) =>
          typeof item !== 'string' && (
            <li key={item.meta.id}>
              <Accordion
                className='divide-y-2 rounded-md bg-white'
                header={
                  <div className='flex w-5/6 space-x-4'>
                    <p className='whitespace-nowrap font-bold capitalize'>
                      {item.meta.stems[0]}
                    </p>
                    <p className='whitespace-nowrap italic'>{item.fl}</p>
                    <p className='truncate'>{item.shortdef[0]}</p>
                  </div>
                }
              >
                <ul className='list-disc'>
                  {item.shortdef.map((def, index) => (
                    <li key={index}>{def}</li>
                  ))}
                </ul>
                {item.hwi.prs && (
                  <p className='font-bold'>
                    Transcription: [{item.hwi.prs[0].mw}]
                  </p>
                )}
              </Accordion>
            </li>
          ),
      )}
    </ul>
  );
};

export default WordsList;