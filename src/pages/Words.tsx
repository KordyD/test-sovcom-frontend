import { useState } from 'react';
import WordModule from '../components/WordModule';

const Words = () => {
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

      <WordModule
        query={query}
        changeQuery={(str) => {
          setQuery(str);
        }}
      />
    </div>
  );
};

export default Words;
