import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from '../hooks/useDebounce';
import { AppDispatch } from '../store';
import { fetchData } from '../store/wordsSlice';
import WordsList from './WordsList';

const WordModule = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const debouncedQuery = useDebounce(query);

  useEffect(() => {
    dispatch(fetchData(debouncedQuery));
  }, [debouncedQuery, dispatch]);

  return (
    <>
      <div className='h-40 rounded-md bg-slate-300 p-5'>
        <input
          className='h-8 border-2 border-blue-500 border-opacity-30 p-5'
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          value={query}
          placeholder='Search'
        />
      </div>
      {debouncedQuery === '' ? (
        <div className='flex grow items-center justify-center'>
          <p className='text-2xl text-gray-400'>
            Enter the word you would like to get
          </p>
        </div>
      ) : (
        <div className='w-1/2 grow'>
          <WordsList
            changeQuery={(str) => {
              setQuery(str);
            }}
          />
        </div>
      )}
    </>
  );
};

export default WordModule;
