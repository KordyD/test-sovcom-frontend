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
    <div>
      <input
        className='border-2'
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      {debouncedQuery === '' ? (
        <p>Enter the word you would like to get.</p>
      ) : (
        <WordsList />
      )}
    </div>
  );
};

export default WordModule;
