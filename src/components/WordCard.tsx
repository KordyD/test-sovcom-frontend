import { Star } from 'lucide-react';
import Accordion from './ui/Accordion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addToFavorite, removeFromFavorite } from '../store/wordsSlice';
import { Word } from '../interfaces';

const WordCard = ({ word }: { word: Word }) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites);

  return (
    <Accordion
      rightButton={
        <button
          onClick={(event) => {
            event.stopPropagation();
            if (favorites.find((elem) => elem.meta.id === word.meta.id)) {
              dispatch(removeFromFavorite(word));
            } else {
              dispatch(addToFavorite(word));
            }
          }}
          className='text-blue-400 hover:text-blue-600'
        >
          <Star
            className={`${favorites.find((elem) => elem.meta.id === word.meta.id) ? 'fill-blue-400' : ''}`}
          />
        </button>
      }
      className='divide-y-2 rounded-md bg-white'
      header={
        <div className='flex w-5/6 space-x-4'>
          <p className='whitespace-nowrap font-bold capitalize'>
            {word.meta.stems[0]}
          </p>
          <p className='whitespace-nowrap italic'>{word.fl}</p>
          <p className='truncate'>{word.shortdef[0]}</p>
        </div>
      }
    >
      <ul className='list-disc'>
        {word.shortdef.map((def, index) => (
          <li key={index}>{def}</li>
        ))}
      </ul>
      {word.hwi.prs && (
        <p className='font-bold'>Transcription: [{word.hwi.prs[0].mw}]</p>
      )}
    </Accordion>
  );
};

export default WordCard;
