interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rest: any;
  className?: string;
}

export default function Button({ className, children, color, ...rest }: ButtonProps) {
  function handleColors(color: string) {
    switch (color) {
      case 'primary':
        return 'bg-[#338AF0] hover:bg-[#1F5595]';
      case 'secondary':
        return 'bg-stone-300 hover:bg-stone-400';
      case 'danger':
        return 'bg-red-500 hover:bg-red-600';
      case 'warning':
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-stone-300 hover:bg-stone-400';
    }
  }

  return (
    <button
      className={`${className} ${handleColors(
        color,
      )} flex gap-3 rounded-md items-center justify-center text-lg py-1 px-3 hover:scale-105 transition-all duration-300 font-semibold drop-shadow-md`}
      {...rest}>
      {children}
    </button>
  );
}
