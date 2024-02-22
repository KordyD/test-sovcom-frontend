import { useState } from 'react';
import FavoritesModule from '../components/FavoritesModule';

const Favorites = () => {
  const [query, setQuery] = useState('');

  return (
    <div className='flex space-x-6 py-6'>
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
      <FavoritesModule query={query} />
    </div>
  );
};

export default Favorites;
