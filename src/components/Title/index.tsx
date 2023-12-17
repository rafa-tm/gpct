interface TitleProps {
  children: React.ReactNode;
  order: number;
}

export default function Title({ children, order }: TitleProps) {
  switch (order) {
    case 1:
      return <h1 className={'text-3xl font-bold mt-2 ml-2 mb-2 text-gray-800 border-b border-gray-400'}>{children}</h1>;
      break;
    case 2:
      return <h2 className={'text-2xl font-bold mt-2 ml-2 mb-2 text-gray-800'}>{children}</h2>;
      break;
    case 3:
      return <h3 className={'text-xl font-bold mt-2 ml-2 mb-2 text-gray-800'}>{children}</h3>;
      break;
    case 4:
      return <h4 className={'text-lg font-bold mt-2 ml-2 mb-2 text-gray-800'}>{children}</h4>;
      break;
    case 5:
      return <h5 className={'text-base font-bold mt-2 ml-2 mb-2 text-gray-800'}>{children}</h5>;
      break;
    case 6:
      return <h6 className={'text-sm font-bold mt-2 ml-2 mb-2 text-gray-800'}>{children}</h6>;
      break;
    default:
      break;
  }
}
