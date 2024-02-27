import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useDispatch } from 'react-redux';
import { changePartOfSpeech } from '../store/wordsSlice';

const PartsOfSpeech = () => {
  const partsOfSpeech = [
    ...new Set(
      useSelector((state: RootState) => state.favorites)
        .map((item) => item.fl)
        .filter((item) => item)
        .sort(),
    ),
  ];

  const partOfSpeech = useSelector((state: RootState) => state.partOfSpeech);

  const dispatch = useDispatch<AppDispatch>();

  if (partOfSpeech && !partsOfSpeech.includes(partOfSpeech)) {
    dispatch(changePartOfSpeech(null));
  }

  return (
    <>
      {partsOfSpeech.map((item) => (
        <label key={item} className='text-xl capitalize'>
          <input
            className='mr-2'
            type='radio'
            checked={partOfSpeech === item}
            onClick={() => {
              if (partOfSpeech === item) {
                dispatch(changePartOfSpeech(null));
              } else {
                dispatch(changePartOfSpeech(item));
              }
            }}
          />
          {item}
        </label>
      ))}
    </>
  );
};

export default PartsOfSpeech;
