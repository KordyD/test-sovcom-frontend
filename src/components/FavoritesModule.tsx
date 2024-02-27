import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import FavoritesList from './FavoritesList';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { updateFavorite } from '../store/wordsSlice';

const FavoritesModule = ({ query }: { query: string }) => {
  const partOfSpeech = useSelector((state: RootState) => state.partOfSpeech);

  const favorites = useSelector((state: RootState) => state.favorites).filter(
    (item) =>
      item.meta.stems[0].toLowerCase().includes(query.toLowerCase()) &&
      (partOfSpeech ? item.fl === partOfSpeech : true),
  );

  const dispatch = useDispatch<AppDispatch>();

  const dragEnded = (param: DropResult) => {
    const { source, destination } = param;
    const arr = [...favorites];
    const item = arr.splice(source.index, 1)[0];
    if (!destination) {
      return;
    }
    arr.splice(destination?.index, 0, item);
    dispatch(updateFavorite(arr));
  };

  if (favorites.length === 0) {
    return (
      <div className='flex grow items-center justify-center'>
        <p className='text-2xl text-gray-400'>No words</p>
      </div>
    );
  }

  return (
    <>
      <div className='w-1/2 grow'>
        <DragDropContext onDragEnd={dragEnded}>
          <Droppable droppableId='favorites-wrapper'>
            {(provided) => (
              <>
                <FavoritesList
                  isDragDisabled={query !== '' || partOfSpeech !== null}
                  droppableProps={provided.droppableProps}
                  ref={provided.innerRef}
                  favorites={favorites}
                  placeholder={provided.placeholder}
                />
              </>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default FavoritesModule;
