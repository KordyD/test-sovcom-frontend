import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Accordion from './ui/Accordion';

const WordsList = () => {
  const words = useSelector((state: RootState) => state.words);
  const status = useSelector((state: RootState) => state.status);

  if (status === 'loading') {
    return <h1>loading</h1>;
  }
  if (words.length === 0) {
    return <p>No words</p>;
  }
  if (status === 'advice') {
    return <p>{words[0] as string}</p>;
  }

  return (
    <ul>
      {words.map(
        (item) =>
          typeof item !== 'string' && (
            <li>
              <Accordion
                title={
                  <div className='flex space-x-4'>
                    <p className='font-bold capitalize'>{item.hwi.hw}</p>
                    <p className='italic'>{item.fl}</p>
                    <p>{item.shortdef}</p>
                  </div>
                }
              >
                <ul className='list-disc'>
                  {item.shortdef.map((def) => (
                    <li>{def}</li>
                  ))}
                </ul>
                {item.hwi.prs && (
                  <p className='font-bold'>
                    Transcription: [{item.hwi.prs[0].mw}]
                  </p>
                )}
              </Accordion>
            </li>
          ),
      )}
    </ul>
  );
};

export default WordsList;
