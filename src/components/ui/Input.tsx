import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...props }: InputProps) => {
  return (
    <input
      className='h-8 border-2 border-blue-500 border-opacity-30 p-5'
      {...props}
    />
  );
};

export default Input;
