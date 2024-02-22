import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from '../hooks/useDebounce';
import { AppDispatch } from '../store';
import { fetchData } from '../store/wordsSlice';
import WordsList from './WordsList';

const WordModule = ({
  query,
  changeQuery,
}: {
  query: string;
  changeQuery: (str: string) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    dispatch(fetchData(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  return (
    <>
      {debouncedQuery === '' ? (
        <div className='flex grow items-center justify-center'>
          <p className='text-2xl text-gray-400'>
            Enter the word you would like to get
          </p>
        </div>
      ) : (
        <div className='w-1/2 grow'>
          <WordsList changeQuery={changeQuery} />
        </div>
      )}
    </>
  );
};

export default WordModule;
