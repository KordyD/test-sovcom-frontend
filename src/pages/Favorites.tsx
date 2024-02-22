import { useState } from 'react';
import FavoritesModule from '../components/FavoritesModule';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useDebounce } from '../hooks/useDebounce';

const Favorites = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const [partOfSpeech, setPartOfSpeech] = useState<string | null>(null);
  const partsOfSpeech = [
    ...new Set(
      useSelector((state: RootState) => state.favorites)
        .map((item) => item.fl)
        .filter((item) => item)
        .sort(),
    ),
  ];
  if (partOfSpeech && !partsOfSpeech.includes(partOfSpeech)) {
    setPartOfSpeech(null);
  }
  return (
    <div className='flex space-x-6 py-6'>
      <div className='flex h-min min-h-40 flex-col rounded-md bg-slate-300 p-5'>
        <input
          className='mb-3 h-8 border-2 border-blue-500 border-opacity-30 p-5'
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          value={query}
          placeholder='Search'
        />
        {partsOfSpeech.map((item) => (
          <label key={item} className='text-xl capitalize'>
            <input
              className='mr-2'
              type='radio'
              checked={partOfSpeech === item}
              onClick={() => {
                if (partOfSpeech === item) {
                  setPartOfSpeech(null);
                } else {
                  setPartOfSpeech(item);
                }
              }}
            />
            {item}
          </label>
        ))}
      </div>
      <FavoritesModule query={debouncedQuery} partOfSpeech={partOfSpeech} />
    </div>
  );
};

export default Favorites;
