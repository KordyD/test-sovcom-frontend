import { ChevronDown } from 'lucide-react';
import { HTMLAttributes, ReactNode, Ref, forwardRef, useState } from 'react';

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  header: ReactNode;
  leftButton?: ReactNode;
  rightButton?: ReactNode;
  children?: ReactNode;
}

const Accordion = forwardRef(
  (
    { header, children, leftButton, rightButton, ...props }: AccordionProps,
    ref?: Ref<HTMLDivElement>,
  ) => {
    const [isActive, setIsActive] = useState(false);
    return (
      <div {...props} ref={ref}>
        <div
          className='flex h-16 cursor-pointer justify-between p-5'
          onClick={() => setIsActive((prev) => !prev)}
        >
          {leftButton}
          {header}
          <div className='flex space-x-5'>
            {rightButton}
            <ChevronDown
              className={`transform transition ${isActive ? 'rotate-180' : ''} `}
            />
          </div>
        </div>
        <div className={`px-10 py-3 ${isActive ? '' : 'hidden'}`}>
          {children}
        </div>
      </div>
    );
  },
);

Accordion.displayName = 'Accordion';

export default Accordion;
