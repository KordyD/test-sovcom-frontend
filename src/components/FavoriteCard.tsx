import { GripHorizontal, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Word } from '../interfaces';
import { AppDispatch } from '../store';
import { removeFromFavorite } from '../store/wordsSlice';
import Accordion from './ui/Accordion';
import { Ref, forwardRef } from 'react';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from '@hello-pangea/dnd';

const FavoriteCard = forwardRef(
  (
    {
      word,
      dragHandleProps,
      draggableProps,
      isDragDisabled,
    }: {
      word: Word;
      dragHandleProps?: DraggableProvidedDragHandleProps | null;
      draggableProps: DraggableProvidedDraggableProps;
      isDragDisabled: boolean;
    },
    ref?: Ref<HTMLLIElement>,
  ) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
      <li {...draggableProps} ref={ref}>
        <Accordion
          rightButton={
            <button
              onClick={(event) => {
                event.stopPropagation();
                dispatch(removeFromFavorite(word));
              }}
              className='text-blue-400 hover:text-blue-600'
            >
              <Star className='fill-blue-400' />
            </button>
          }
          leftButton={
            <div
              className={`${isDragDisabled ? 'hidden' : ''}`}
              {...dragHandleProps}
            >
              <GripHorizontal />
            </div>
          }
          className={'divide-y-2 rounded-md bg-white '}
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
      </li>
    );
  },
);

FavoriteCard.displayName = 'FavoriteCard';

export default FavoriteCard;
