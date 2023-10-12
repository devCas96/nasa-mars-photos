import { InputHTMLAttributes } from 'react';

const Input = ({ ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...rest} />;
};

export default Input;