import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import WordCard from './WordCard';

const WordsList = ({ changeQuery }: { changeQuery: (str: string) => void }) => {
  const words = useSelector((state: RootState) => state.words);
  const status = useSelector((state: RootState) => state.status);

  if (status === 'loading') {
    return (
      <div className='flex h-full grow  items-center justify-center'>
        <Loader2 className='size-20 animate-spin stroke-blue-400' />
      </div>
    );
  }
  if (words.length === 0) {
    return (
      <div className='flex h-full grow items-center justify-center'>
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
              <WordCard word={item} />
            </li>
          ),
      )}
    </ul>
  );
};

export default WordsList;
