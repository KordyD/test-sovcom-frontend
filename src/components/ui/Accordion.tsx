import { ChevronDown, Star } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface AccordionProps {
  title: ReactNode;
  children?: ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className='bg-white'>
      <div
        className='flex w-full cursor-pointer justify-between p-5'
        onClick={() => setIsActive((prev) => !prev)}
      >
        <div>{title}</div>
        <div className='flex space-x-2'>
          <button
            onClick={(event) => {
              event.stopPropagation();
              console.log('fav');
            }}
            className='bg-red-500'
          >
            <Star />
          </button>
          <div>
            <ChevronDown
              className={`transform transition ${isActive ? 'rotate-180' : ''} `}
            />
          </div>
        </div>
      </div>
      <div className={`px-10 py-3 ${isActive ? '' : 'hidden'}`}>{children}</div>
    </div>
  );
};

export default Accordion;
