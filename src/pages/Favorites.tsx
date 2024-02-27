import { useState } from 'react';
import FavoritesModule from '../components/FavoritesModule';
import { useDebounce } from '../hooks/useDebounce';
import Input from '../components/ui/Input';
import PartsOfSpeech from '../components/PartsOfSpeech';

const Favorites = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  return (
    <div className='flex space-x-6 py-6'>
      <div className='h-min min-h-40 rounded-md bg-slate-300 p-5'>
        <Input
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          value={query}
          placeholder='Search'
        />
        <div className='mt-5 flex flex-col'>
          <PartsOfSpeech />
        </div>
      </div>
      <FavoritesModule query={debouncedQuery} />
    </div>
  );
};

export default Favorites;
