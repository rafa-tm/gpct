import { twMerge } from 'tailwind-merge';
import { ChangeEvent, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';

interface InputProps {
  label?: string;
  direction?: 'row' | 'column';
  type?: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  register?: UseFormRegisterReturn<string>;
  errors?: unknown;
}

export default function Input({
  label,
  direction = 'column',
  type = 'text',
  id,
  placeholder,
  value,
  onChange,
  errors,
  register,
  className,
}: InputProps) {
  const [innerType, setInnerType] = useState(type);
  return (
    <div className={twMerge('w-full flex flex-col gap-1', className)}>
      <div className={`w-full gap-1 ${direction === 'row' ? 'flex items-center' : 'flex items-start flex-col'}`}>
        {label && (
          <label className="text-black text-base font-semibold" htmlFor={id}>
            {`${label}:`}
          </label>
        )}
        <div className="w-full flex items-center relative">
          <input
            id={id}
            className="w-full py-2 px-2 rounded-sm border border-stone-500 focus:outline-none focus:border-secondary-500"
            type={type === 'password' ? innerType : type}
            name={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...register}
          />
          {type === 'password' && (
            <div className="flex justify-end absolute right-3">
              <button
                type="button"
                onClick={() => setInnerType(innerType === 'password' ? 'text' : 'password')}
                className="text-sm text-secondary-500 hover:text-secondary-600 focus:outline-none">
                {innerType === 'password' ? <IconEyeClosed size={20} /> : <IconEye size={20} />}
              </button>
            </div>
          )}
        </div>
      </div>
      {errors && errors[id] && <span className="text-red-500 text-sm">{errors[id].message}</span>}
    </div>
  );
}
