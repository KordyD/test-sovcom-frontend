import { ReactNode, Ref, forwardRef } from 'react';
import { Word } from '../interfaces';
import FavoriteCard from './FavoriteCard';
import { Draggable, DroppableProvidedProps } from '@hello-pangea/dnd';

const FavoritesList = forwardRef(
  (
    {
      favorites,
      droppableProps,
      placeholder,
      isDragDisabled,
    }: {
      favorites: Word[];
      droppableProps: DroppableProvidedProps;
      placeholder: ReactNode;
      isDragDisabled: boolean;
    },
    ref?: Ref<HTMLUListElement>,
  ) => {
    return (
      <ul {...droppableProps} ref={ref} className='space-y-3'>
        {favorites.map((item, index) => {
          return (
            <Draggable
              key={item.meta.id}
              draggableId={item.meta.id}
              index={index}
              isDragDisabled={isDragDisabled}
            >
              {(provided) => (
                <FavoriteCard
                  isDragDisabled={isDragDisabled}
                  dragHandleProps={provided.dragHandleProps}
                  ref={provided.innerRef}
                  word={item}
                  draggableProps={provided.draggableProps}
                />
              )}
            </Draggable>
          );
        })}
        {placeholder}
      </ul>
    );
  },
);

FavoritesList.displayName = 'FavoritesList';

export default FavoritesList;
