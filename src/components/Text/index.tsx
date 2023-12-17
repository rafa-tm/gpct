export default function Text({ children }: { children: React.ReactNode }) {
  return <p className={'text-base font-normal my-2 mb-2 text-gray-950'}>{children}</p>;
}
