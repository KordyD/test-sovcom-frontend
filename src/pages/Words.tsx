import { useState } from 'react';
import WordModule from '../components/WordModule';
import Input from '../components/ui/Input';

const Words = () => {
  const [query, setQuery] = useState('');

  return (
    <div className='flex space-x-6 py-6'>
      <div className='h-40 rounded-md bg-slate-300 p-5'>
        <Input
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
