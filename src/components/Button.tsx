import { twMerge } from 'tailwind-merge';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  to?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rest?: any;
  className?: string;
}

export default function Button({ className, children, color, to, ...rest }: ButtonProps) {
  function handleColors(color: string) {
    switch (color) {
      case 'primary':
        return 'bg-primary-500 hover:bg-primary-700 ';
      case 'secondary':
        return 'bg-secondary-500 hover:bg-secondary-700 text-light';
      case 'tertiary':
        return 'bg-tertiary-500 hover:bg-tertiary-700';
      case 'success':
        return 'bg-success';
      case 'danger':
        return 'bg-danger-500 hover:bg-danger-700';
      case 'error':
        return 'bg-error-500 hover:bg-error-700';
      case 'warning':
        return 'bg-warning-500 hover:bg-warning-700';
      case 'text':
        return 'bg-transparent hover:bg-transparent font-semibold underline';
      case 'transparent':
        return 'bg-transparent hover:opacity-80';
      case 'disabled':
        return 'bg-stone-200 text-stone-500 opacity-80 cursor-not-allowed';
      default:
        return 'bg-stone-300 hover:bg-stone-400';
    }
  }

  if (to)
    return (
      <Link
        className={`${twMerge(
          'w-fit flex gap-4 px-4 py-1 relative rounded-md items-center justify-center text-base hover:scale-105 transition-all duration-200 font-sans font-semibold drop-shadow-md',
          handleColors(color),
          className,
        )} `}
        to={to}
        {...rest}>
        {children}
      </Link>
    );

  return (
    <button
      className={`${twMerge(
        'w-fit flex gap-4 px-4 py-1 relative rounded-md items-center justify-center text-base hover:scale-105 transition-all duration-200 font-sans font-semibold drop-shadow-md',
        handleColors(color),
        className,
      )} `}
      {...rest}>
      {children}
    </button>
  );
}
