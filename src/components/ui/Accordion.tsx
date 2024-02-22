import { ChevronDown, Star } from 'lucide-react';
import { HTMLAttributes, ReactNode, useState } from 'react';

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  header: ReactNode;
  children?: ReactNode;
}

const Accordion = ({ header, children, ...props }: AccordionProps) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div {...props}>
      <div
        className='flex h-16 cursor-pointer justify-between p-5'
        onClick={() => setIsActive((prev) => !prev)}
      >
        {header}
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
