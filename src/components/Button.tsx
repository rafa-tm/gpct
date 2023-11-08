interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rest?: any;
  className?: string;
}

export default function Button({ className, children, title, color, ...rest }: ButtonProps) {
  function handleColors(color: string) {
    switch (color) {
      case 'primary':
        return 'bg-[#338AF0] hover:bg-[#1F5595] py-1 px-3';
      case 'secondary':
        return 'bg-stone-300 hover:bg-stone-400 py-1 px-3';
      case 'transparent':
        return 'bg-transparent px-0';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600 py-1 px-3';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600 py-1 px-3';
      default:
        return 'bg-stone-300 hover:bg-stone-400 py-1 px-3';
    }
  }

  return (
    <button
      className={`${className} ${handleColors(
        color,
      )} flex gap-3 relative rounded-md items-center justify-center text-lg hover:scale-105 transition-all duration-300 font-semibold drop-shadow-md`}
      {...rest}>
      {title && (
        <span
          className={`absolute left-1/2 -bottom-2 w-fit rounded-md transition-all duration-300 text-white bg-gray-950 p-1`}>
          {title}
        </span>
      )}
      {children}
    </button>
  );
}
